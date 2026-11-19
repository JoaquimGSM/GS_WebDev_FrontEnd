
# Cityzer

Aplicação web de mobilidade urbana colaborativa desenvolvida para a Global Solution 2026.2 da FIAP, no desafio CitizenTech.


## Integrantes
Joaquim Gaspardo |RM572208
Gabriel Flausino | RM572486
Felipe Kenji | RM568739
Gustavo Ducatti | RM570932

## Ficha da CitizenTech

- **Nome:** Cityzer
- **Área atendida:** Municípios da Região Metropolitana de São Paulo, com localização de ocorrências por coordenadas no mapa.
- **Cidadãos beneficiados:** Motoristas, motociclistas, ciclistas, pedestres e demais pessoas que utilizam as vias públicas.
- **Problema:** Informações sobre obstáculos e problemas nas vias nem sempre chegam às pessoas de forma rápida e confiável.
- **Solução:** Uma plataforma para registrar, consultar e validar ocorrências de trânsito com participação da comunidade.
- **Indicadores de impacto:** Quantidade de ocorrências registradas, relatos colaborativos, alertas publicados e problemas sinalizados como resolvidos.
- **ODS relacionados:** ODS 11 — Cidades e Comunidades Sustentáveis; ODS 9 — Indústria, Inovação e Infraestrutura.
- **Repositório:** Adicionar o endereço do repositório privado antes da entrega.

### Como funciona

1. O usuário cria uma conta e informa sua cidade.
2. Seleciona no mapa a localização de um problema.
3. Registra a categoria, a descrição e uma referência opcional.
4. A ocorrência é criada como pendente, com o primeiro relato associado ao autor.
5. Outros usuários da mesma cidade podem confirmar que encontraram o problema.
6. Após seis relatos de contas distintas, o alerta é publicado no mapa.
7. Após o prazo da categoria, os usuários podem verificar se o problema continua.
8. Três respostas negativas de usuários distintos removem o alerta do mapa.

### Partes da aplicação

- **Interface:** telas, formulários, filtros, mapa e visualização responsiva.
- **Interação:** autenticação, navegação, gerenciamento de ocorrências e participação comunitária.
- **Dados:** armazenamento no Supabase, políticas de acesso e funções SQL para validação das regras de negócio.

## Tecnologias

- React
- Vite
- JavaScript
- Tailwind CSS
- React Leaflet e OpenStreetMap
- Lucide React
- Supabase Auth
- Supabase Database (PostgreSQL)
- Git e GitHub
- Vercel

## Funcionalidades

- Cadastro e login com autenticação real.
- Sessão persistente e logout.
- Mapa interativo com seleção de coordenadas.
- Registro de acidentes, buracos, alagamentos, obras e árvores caídas.
- Filtros por categoria.
- CRUD de ocorrências com controle de autoria.
- Consulta das ocorrências pendentes e publicadas.
- Validação inicial por seis relatos distintos.
- Confirmação de permanência dos problemas.
- Remoção após três confirmações negativas distintas.
- Restrições de acesso com Row Level Security (RLS).

## Regras de negócio

| Regra | Funcionamento |
| --- | --- |
| Publicação | Seis relatos de usuários distintos |
| Acidentes | Revisão liberada após 6 horas |
| Buracos | Revisão liberada após 24 horas |
| Alagamentos | Revisão liberada após 24 horas |
| Árvores caídas | Revisão liberada após 24 horas |
| Obras | Prazo de revisão ainda não definido |
| Remoção | Três confirmações negativas distintas |
| Edição e exclusão | Permitidas ao autor enquanto a ocorrência estiver pendente |

A verificação é manual e colaborativa. Não há confirmação automática por GPS.

Os dados do mapa são atualizados ao consultar ou atualizar as informações; não existe sincronização contínua em tempo real.

## Pré-requisitos

- Node.js e npm instalados.
- Projeto Supabase configurado.
- Credenciais públicas do Supabase.
- Acesso à internet para autenticação, banco e carregamento do mapa.

## Instalação

Clone o repositório e entre na pasta do projeto.

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env.local` na raiz, seguindo o modelo `.env.example`:

```env
VITE_SUPABASE_URL=SUA_PROJECT_URL
VITE_SUPABASE_PUBLISHABLE_KEY=SUA_PUBLISHABLE_KEY
```

Não utilize uma chave `service_role` ou chave secreta no frontend.

## Configuração do banco

Em um projeto Supabase, execute os scripts da pasta `supabase/` nesta ordem:

1. `estrutura_inicial.sql`
2. `autenticacao_perfis.sql`
3. `politicas_rls.sql`
4. `mapa_colaborativo.sql`
5. `validacao_colaborativa.sql`

Configure também o provedor de autenticação por e-mail e as URLs autorizadas de redirecionamento no Supabase.

## Executar localmente

```bash
npm run dev
```

Acesse:

http://localhost:5173

## Qualidade e build

```bash
npm run lint
npm run build
```

A compilação de produção é gerada na pasta `dist/`.

## Estrutura principal

```text
src/
  assets/
  components/
    celular/
  dados/
  hooks/
    useAutenticacao.js
    useOcorrenciasMapa.js
  servicos/
    supabase.js
    ocorrencias.js
    confirmacoes.js

supabase/
  estrutura_inicial.sql
  autenticacao_perfis.sql
  politicas_rls.sql
  mapa_colaborativo.sql
  validacao_colaborativa.sql

AI.md
README.md
```

## Segurança

- Autenticação com Supabase Auth.
- RLS para restringir o acesso aos registros.
- Permissões de criação, edição e exclusão verificadas pelo banco.
- Regras colaborativas implementadas em funções SQL.
- Credenciais locais mantidas fora do controle de versão.

## Limitações

- A categoria de obras ainda não possui prazo de revisão definido.
- A localização é selecionada manualmente no mapa.
- Não há monitoramento automático da passagem de usuários pelo local.
- O sistema depende da participação de usuários distintos para validar alertas.

## Uso de inteligência artificial

O desenvolvimento utilizou assistência do ChatGPT para planejamento, implementação e revisão de código. As interações, aplicações e validações estão documentadas no arquivo `AI.md`.

## Projeto acadêmico

FIAP — Engenharia de Software

Global Solution — 2º semestre de 2026

Disciplinas: Web Development e Front-End Design