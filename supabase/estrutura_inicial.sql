begin;

create table public.perfis (
  id uuid primary key
    references auth.users(id)
    on delete cascade,

  nome text not null
    check (char_length(btrim(nome)) between 3 and 120),

  cidade text not null
    check (char_length(btrim(cidade)) between 2 and 120),

  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

comment on table public.perfis is
  'Dados de perfil dos usuarios autenticados da Cityzer.';



create table public.ocorrencias (
  id uuid primary key default gen_random_uuid(),

  autor_id uuid not null
    references auth.users(id)
    on delete cascade,

  cidade text not null
    check (char_length(btrim(cidade)) between 2 and 120),

  categoria text not null
    check (
      categoria in (
        'acidente',
        'buraco',
        'alagamento',
        'obra',
        'arvore'
      )
    ),

  latitude numeric(9,6) not null
    check (latitude between -90 and 90),

  longitude numeric(9,6) not null
    check (longitude between -180 and 180),

  referencia text not null default ''
    check (char_length(referencia) <= 80),

  descricao text not null
    check (
      char_length(btrim(descricao)) between 10 and 300
    ),

  status text not null default 'pendente'
    check (
      status in (
        'pendente',
        'publicada',
        'removida'
      )
    ),

  criada_em timestamptz not null default now(),
  atualizada_em timestamptz not null default now(),

  publicada_em timestamptz,
  revisao_disponivel_em timestamptz,
  removida_em timestamptz
);

comment on table public.ocorrencias is
  'Ocorrencias colaborativas registradas nas vias.';




create table public.relatos (
  id uuid primary key default gen_random_uuid(),

  ocorrencia_id uuid not null
    references public.ocorrencias(id)
    on delete cascade,

  usuario_id uuid not null
    references auth.users(id)
    on delete cascade,

  criado_em timestamptz not null default now(),

  constraint relato_unico_por_usuario
    unique (ocorrencia_id, usuario_id)
);

comment on table public.relatos is
  'Relatos de usuarios distintos sobre uma ocorrencia.';




create table public.confirmacoes (
  id uuid primary key default gen_random_uuid(),

  ocorrencia_id uuid not null
    references public.ocorrencias(id)
    on delete cascade,

  usuario_id uuid not null
    references auth.users(id)
    on delete cascade,

  resposta text not null
    check (resposta in ('sim', 'nao')),

  criada_em timestamptz not null default now(),

  constraint confirmacao_unica_por_usuario
    unique (ocorrencia_id, usuario_id)
);

comment on table public.confirmacoes is
  'Confirmacoes colaborativas sobre a permanencia dos problemas.';



create index idx_ocorrencias_autor
  on public.ocorrencias (autor_id);

create index idx_ocorrencias_cidade_status
  on public.ocorrencias (cidade, status);

create index idx_ocorrencias_categoria_status
  on public.ocorrencias (categoria, status);

create index idx_ocorrencias_criada_em
  on public.ocorrencias (criada_em desc);

create index idx_relatos_usuario
  on public.relatos (usuario_id);

create index idx_confirmacoes_usuario
  on public.confirmacoes (usuario_id);

create index idx_confirmacoes_ocorrencia_resposta
  on public.confirmacoes (ocorrencia_id, resposta);




alter table public.perfis
  enable row level security;

alter table public.ocorrencias
  enable row level security;

alter table public.relatos
  enable row level security;

alter table public.confirmacoes
  enable row level security;

commit;
