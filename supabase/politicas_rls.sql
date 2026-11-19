begin;

alter table public.perfis enable row level security;
alter table public.ocorrencias enable row level security;
alter table public.relatos enable row level security;
alter table public.confirmacoes enable row level security;

revoke all on table
  public.perfis,
  public.ocorrencias,
  public.relatos,
  public.confirmacoes
from public, anon, authenticated;

grant select on public.perfis to authenticated;

grant select on public.ocorrencias to authenticated;

grant insert (
  autor_id,
  cidade,
  categoria,
  latitude,
  longitude,
  referencia,
  descricao
)
on public.ocorrencias to authenticated;

grant update (
  categoria,
  referencia,
  descricao
)
on public.ocorrencias to authenticated;

grant delete on public.ocorrencias to authenticated;

drop policy if exists
  "cityzer_perfis_ler_proprio"
on public.perfis;

create policy "cityzer_perfis_ler_proprio"
on public.perfis
for select
to authenticated
using (
  id = (select auth.uid())
);

drop policy if exists
  "cityzer_ocorrencias_ler"
on public.ocorrencias;

create policy "cityzer_ocorrencias_ler"
on public.ocorrencias
for select
to authenticated
using (
  autor_id = (select auth.uid())
  or status = 'publicada'
);

drop policy if exists
  "cityzer_ocorrencias_criar"
on public.ocorrencias;

create policy "cityzer_ocorrencias_criar"
on public.ocorrencias
for insert
to authenticated
with check (
  autor_id = (select auth.uid())
  and status = 'pendente'
  and publicada_em is null
  and revisao_disponivel_em is null
  and removida_em is null
  and cidade = (
    select p.cidade
    from public.perfis p
    where p.id = (select auth.uid())
  )
);

drop policy if exists
  "cityzer_ocorrencias_atualizar"
on public.ocorrencias;

create policy "cityzer_ocorrencias_atualizar"
on public.ocorrencias
for update
to authenticated
using (
  autor_id = (select auth.uid())
  and status = 'pendente'
)
with check (
  autor_id = (select auth.uid())
  and status = 'pendente'
);

drop policy if exists
  "cityzer_ocorrencias_excluir"
on public.ocorrencias;

create policy "cityzer_ocorrencias_excluir"
on public.ocorrencias
for delete
to authenticated
using (
  autor_id = (select auth.uid())
  and status = 'pendente'
);

create schema if not exists private;

create or replace function private.cityzer_atualizar_ocorrencia_em()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.atualizada_em = now();
  return new;
end;
$$;

drop trigger if exists
  cityzer_atualizar_data_ocorrencia
on public.ocorrencias;

create trigger cityzer_atualizar_data_ocorrencia
before update on public.ocorrencias
for each row
execute function private.cityzer_atualizar_ocorrencia_em();

revoke all on function
  private.cityzer_atualizar_ocorrencia_em()
from public, anon, authenticated;

commit;
