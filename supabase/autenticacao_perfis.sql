begin;

create schema if not exists private;

revoke all on schema private from public;


create or replace function private.criar_perfil_cityzer()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  nome_informado text;
  cidade_informada text;
begin
  nome_informado :=
    pg_catalog.btrim(
      coalesce(new.raw_user_meta_data ->> 'nome', '')
    );

  cidade_informada :=
    pg_catalog.btrim(
      coalesce(new.raw_user_meta_data ->> 'cidade', '')
    );

  -- Os dados obrigatorios precisam ser validos.
  if pg_catalog.char_length(nome_informado) < 3
     or pg_catalog.char_length(nome_informado) > 120
     or pg_catalog.char_length(cidade_informada) < 2
     or pg_catalog.char_length(cidade_informada) > 120
  then
    raise exception
      'Nome e cidade validos sao obrigatorios no cadastro.';
  end if;

  insert into public.perfis (
    id,
    nome,
    cidade
  )
  values (
    new.id,
    nome_informado,
    cidade_informada
  );

  return new;
end;
$$;

revoke all on function private.criar_perfil_cityzer()
from public, anon, authenticated;

drop trigger if exists
  cityzer_criar_perfil_ao_cadastrar
on auth.users;

create trigger cityzer_criar_perfil_ao_cadastrar
after insert on auth.users
for each row
execute function private.criar_perfil_cityzer();

commit;
