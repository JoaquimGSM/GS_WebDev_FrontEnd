begin;

create or replace function private.cityzer_definir_revisao()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if old.status = 'pendente'
     and new.status = 'publicada' then

    new.publicada_em := coalesce(new.publicada_em, now());

    new.revisao_disponivel_em :=
      case
        when new.categoria = 'acidente'
          then new.publicada_em + interval '6 hours'
        when new.categoria in (
          'buraco', 'alagamento', 'arvore'
        )
          then new.publicada_em + interval '24 hours'
        else null
      end;

  elsif old.status = 'publicada'
     and new.status = 'removida' then

    new.removida_em := coalesce(new.removida_em, now());

  end if;

  return new;
end;
$$;

drop trigger if exists
  cityzer_definir_revisao
on public.ocorrencias;

create trigger cityzer_definir_revisao
before update of status on public.ocorrencias
for each row
execute function private.cityzer_definir_revisao();

update public.ocorrencias
set
  publicada_em = coalesce(publicada_em, criada_em),
  revisao_disponivel_em =
    case
      when categoria = 'acidente'
        then coalesce(publicada_em, criada_em)
          + interval '6 hours'
      when categoria in (
        'buraco', 'alagamento', 'arvore'
      )
        then coalesce(publicada_em, criada_em)
          + interval '24 hours'
      else null
    end
where status = 'publicada'
  and revisao_disponivel_em is null
  and categoria in (
    'acidente', 'buraco', 'alagamento', 'arvore'
  );

create or replace function private.cityzer_consultar_confirmacao(
  p_ocorrencia_id uuid
)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_usuario uuid := auth.uid();
  v_status text;
  v_revisao timestamptz;
  v_sim bigint;
  v_nao bigint;
  v_minha_resposta text;
begin
  if v_usuario is null then
    raise exception 'Autenticacao obrigatoria.';
  end if;

  select
    o.status,
    o.revisao_disponivel_em
  into
    v_status,
    v_revisao
  from public.ocorrencias o
  join public.perfis p
    on p.id = v_usuario
   and p.cidade = o.cidade
  where o.id = p_ocorrencia_id
    and o.status in ('publicada', 'removida');

  if not found then
    raise exception 'Ocorrencia indisponivel.';
  end if;

  select
    count(*) filter (where resposta = 'sim'),
    count(*) filter (where resposta = 'nao')
  into v_sim, v_nao
  from public.confirmacoes
  where ocorrencia_id = p_ocorrencia_id;

  select resposta
  into v_minha_resposta
  from public.confirmacoes
  where ocorrencia_id = p_ocorrencia_id
    and usuario_id = v_usuario;

  return jsonb_build_object(
    'status', v_status,
    'revisaoDisponivelEm', v_revisao,
    'totalSim', v_sim,
    'totalNao', v_nao,
    'minhaResposta', v_minha_resposta
  );
end;
$$;

create or replace function private.cityzer_gravar_confirmacao(
  p_ocorrencia_id uuid,
  p_resposta text
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_usuario uuid := auth.uid();
  v_cidade text;
  v_status text;
  v_cidade_ocorrencia text;
  v_revisao timestamptz;
  v_sim bigint;
  v_nao bigint;
  v_inseridas integer;
begin
  if v_usuario is null then
    raise exception 'Autenticacao obrigatoria.';
  end if;

  if p_resposta is null
     or p_resposta not in ('sim', 'nao') then
    raise exception 'Resposta invalida.';
  end if;

  select cidade into v_cidade
  from public.perfis
  where id = v_usuario;

  if v_cidade is null then
    raise exception 'Perfil nao encontrado.';
  end if;

  select
    status,
    cidade,
    revisao_disponivel_em
  into
    v_status,
    v_cidade_ocorrencia,
    v_revisao
  from public.ocorrencias
  where id = p_ocorrencia_id
  for update;

  if not found or v_cidade_ocorrencia <> v_cidade then
    raise exception 'Ocorrencia indisponivel.';
  end if;

  if v_status <> 'publicada' then
    raise exception 'Esta ocorrencia nao aceita confirmacoes.';
  end if;

  if v_revisao is null then
    raise exception 'Prazo de verificacao nao definido.';
  end if;

  if now() < v_revisao then
    raise exception 'O prazo de verificacao ainda nao chegou.';
  end if;

  insert into public.confirmacoes (
    ocorrencia_id,
    usuario_id,
    resposta
  )
  values (
    p_ocorrencia_id,
    v_usuario,
    p_resposta
  )
  on conflict (ocorrencia_id, usuario_id)
  do nothing;

  get diagnostics v_inseridas = row_count;

  if v_inseridas = 0 then
    raise exception 'Voce ja confirmou esta ocorrencia.';
  end if;

  select
    count(*) filter (where resposta = 'sim'),
    count(*) filter (where resposta = 'nao')
  into v_sim, v_nao
  from public.confirmacoes
  where ocorrencia_id = p_ocorrencia_id;

  if v_nao >= 3 then
    update public.ocorrencias
    set status = 'removida'
    where id = p_ocorrencia_id
      and status = 'publicada';

    v_status := 'removida';
  end if;

  return jsonb_build_object(
    'status', v_status,
    'revisaoDisponivelEm', v_revisao,
    'totalSim', v_sim,
    'totalNao', v_nao,
    'minhaResposta', p_resposta
  );
end;
$$;

revoke all on function
  private.cityzer_consultar_confirmacao(uuid)
from public, anon, authenticated;

revoke all on function
  private.cityzer_gravar_confirmacao(uuid, text)
from public, anon, authenticated;

grant usage on schema private to authenticated;

grant execute on function
  private.cityzer_consultar_confirmacao(uuid)
to authenticated;

grant execute on function
  private.cityzer_gravar_confirmacao(uuid, text)
to authenticated;

create or replace function public.consultar_confirmacao_cityzer(
  p_ocorrencia_id uuid
)
returns jsonb
language sql
stable
security invoker
set search_path = ''
as $$
  select private.cityzer_consultar_confirmacao(
    p_ocorrencia_id
  );
$$;

create or replace function public.confirmar_ocorrencia_cityzer(
  p_ocorrencia_id uuid,
  p_resposta text
)
returns jsonb
language sql
volatile
security invoker
set search_path = ''
as $$
  select private.cityzer_gravar_confirmacao(
    p_ocorrencia_id,
    p_resposta
  );
$$;

revoke all on function
  public.consultar_confirmacao_cityzer(uuid)
from public, anon, authenticated;

revoke all on function
  public.confirmar_ocorrencia_cityzer(uuid, text)
from public, anon, authenticated;

grant execute on function
  public.consultar_confirmacao_cityzer(uuid)
to authenticated;

grant execute on function
  public.confirmar_ocorrencia_cityzer(uuid, text)
to authenticated;

commit;
