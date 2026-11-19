begin;

grant select on public.ocorrencias to anon;

drop policy if exists
  "cityzer_mapa_publico"
on public.ocorrencias;

create policy "cityzer_mapa_publico"
on public.ocorrencias
for select
to anon
using (status = 'publicada');

create or replace function private.cityzer_relato_inicial()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.relatos (
    ocorrencia_id,
    usuario_id
  )
  values (
    new.id,
    new.autor_id
  )
  on conflict (ocorrencia_id, usuario_id)
  do nothing;

  return new;
end;
$$;

drop trigger if exists
  cityzer_relato_ao_criar
on public.ocorrencias;

create trigger cityzer_relato_ao_criar
after insert on public.ocorrencias
for each row
execute function private.cityzer_relato_inicial();

revoke all on function
  private.cityzer_relato_inicial()
from public, anon, authenticated;

insert into public.relatos (
  ocorrencia_id,
  usuario_id
)
select
  o.id,
  o.autor_id
from public.ocorrencias o
where o.status = 'pendente'
on conflict (ocorrencia_id, usuario_id)
do nothing;

create or replace function public.listar_pendentes_cityzer()
returns table (
  id uuid,
  cidade text,
  categoria text,
  referencia text,
  descricao text,
  latitude numeric,
  longitude numeric,
  criada_em timestamptz,
  total_relatos bigint,
  ja_relatei boolean
)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if auth.uid() is null then
    raise exception 'Autenticacao obrigatoria.';
  end if;

  return query
  select
    o.id,
    o.cidade,
    o.categoria,
    o.referencia,
    o.descricao,
    o.latitude,
    o.longitude,
    o.criada_em,
    count(r.id)::bigint,
    coalesce(
      bool_or(r.usuario_id = auth.uid()),
      false
    )
  from public.ocorrencias o
  join public.perfis p
    on p.id = auth.uid()
   and p.cidade = o.cidade
  left join public.relatos r
    on r.ocorrencia_id = o.id
  where o.status = 'pendente'
  group by o.id
  order by o.criada_em desc
  limit 100;
end;
$$;

revoke all on function
  public.listar_pendentes_cityzer()
from public, anon, authenticated;

grant execute on function
  public.listar_pendentes_cityzer()
to authenticated;

create or replace function public.adicionar_relato_cityzer(
  p_ocorrencia_id uuid
)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_usuario uuid;
  v_cidade text;
  v_status text;
  v_cidade_ocorrencia text;
  v_total integer;
  v_inseridas integer;
begin
  v_usuario := auth.uid();

  if v_usuario is null then
    raise exception 'Faca login para relatar.';
  end if;

  select p.cidade
  into v_cidade
  from public.perfis p
  where p.id = v_usuario;

  if v_cidade is null then
    raise exception 'Perfil nao encontrado.';
  end if;

  select
    o.status,
    o.cidade
  into
    v_status,
    v_cidade_ocorrencia
  from public.ocorrencias o
  where o.id = p_ocorrencia_id
  for update;

  if not found then
    raise exception 'Ocorrencia nao encontrada.';
  end if;

  if v_status <> 'pendente' then
    raise exception 'Esta ocorrencia nao aceita novos relatos.';
  end if;

  if v_cidade_ocorrencia <> v_cidade then
    raise exception 'Ocorrencia de outra cidade.';
  end if;

  insert into public.relatos (
    ocorrencia_id,
    usuario_id
  )
  values (
    p_ocorrencia_id,
    v_usuario
  )
  on conflict (ocorrencia_id, usuario_id)
  do nothing;

  get diagnostics v_inseridas = row_count;

  if v_inseridas = 0 then
    raise exception 'Voce ja relatou esta ocorrencia.';
  end if;

  select count(*)::integer
  into v_total
  from public.relatos r
  where r.ocorrencia_id = p_ocorrencia_id;

  if v_total >= 6 then
    update public.ocorrencias
    set
      status = 'publicada',
      publicada_em = now(),
      atualizada_em = now()
    where id = p_ocorrencia_id
      and status = 'pendente';
  end if;

  return v_total;
end;
$$;

revoke all on function
  public.adicionar_relato_cityzer(uuid)
from public, anon, authenticated;

grant execute on function
  public.adicionar_relato_cityzer(uuid)
to authenticated;

commit;
