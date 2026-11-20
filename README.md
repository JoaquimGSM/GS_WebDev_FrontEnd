# Cityzer

**Plataforma colaborativa de mobilidade urbana | Global Solution 2026.2 — FIAP**

A **Cityzer** é uma aplicação web desenvolvida para o desafio **CitizenTech**, com o objetivo de facilitar o compartilhamento de informações sobre problemas que afetam a circulação nas vias urbanas.

Por meio de um mapa interativo, cidadãos podem registrar ocorrências, consultar alertas e colaborar para validar informações compartilhadas pela comunidade.

O principal diferencial da Cityzer é seu **sistema de validação colaborativa**: um alerta somente é publicado no mapa após receber seis relatos de contas distintas, reduzindo a exposição de informações não confirmadas.

## Acesse o projeto

**Aplicação publicada:** [Cityzer — Vercel](https://gs-web-dev-front-end-seven.vercel.app)

**Guia de uso:** [Como utilizar a Cityzer](./GUIA_DE_USO_Cityzer.md)

**Documentação do uso de IA:** [AI.md](./AI.md)

O código-fonte é mantido em um repositório privado do GitHub, disponibilizado aos professores responsáveis pela avaliação.

## Integrantes

| Integrante | RM |
|---|---|
| Joaquim Gaspardo | 572208 |
| Gabriel Flausino | 572486 |
| Felipe Kenji | 568739 |
| Gustavo Ducatti | 570932 |

## Ficha CitizenTech

| Item | Descrição |
|---|---|
| **Nome da solução** | Cityzer |
| **Área atendida** | Municípios da Região Metropolitana de São Paulo |
| **Público beneficiado** | Motoristas, motociclistas, ciclistas, pedestres e demais usuários das vias públicas |
| **Problema identificado** | Dificuldade de acesso a informações colaborativas e confiáveis sobre obstáculos e problemas nas vias |
| **Solução proposta** | Plataforma de registro, consulta e validação comunitária de ocorrências urbanas |
| **Indicadores de impacto** | Ocorrências registradas, relatos colaborativos, alertas publicados e problemas sinalizados como resolvidos |
| **ODS relacionados** | ODS 11 — Cidades e Comunidades Sustentáveis; ODS 9 — Indústria, Inovação e Infraestrutura |

## Como a Cityzer funciona

### 1. Cadastro e acesso

O cidadão cria uma conta, realiza o login e informa sua cidade.

A autenticação permite associar os registros aos respectivos usuários e controlar a participação nas validações.

### 2. Registro de ocorrências

Ao identificar um problema em uma via, o usuário pode:

1. Abrir o mapa interativo.
2. Selecionar a localização da ocorrência.
3. Escolher uma categoria.
4. Informar uma descrição.
5. Adicionar uma referência do local, caso necessário.
6. Registrar a ocorrência.

As categorias disponíveis são:

- Acidentes de trânsito.
- Buracos nas vias.
- Alagamentos.
- Obras e intervenções.
- Árvores caídas.

Toda nova ocorrência começa com o status **pendente**. O relato do autor já é considerado o primeiro dos seis relatos necessários para sua publicação.

### 3. Validação colaborativa

Outros usuários da mesma cidade podem consultar as ocorrências pendentes na área de colaboração.

Quando identificam o mesmo problema, podem contribuir com um relato.

**Uma ocorrência precisa de seis relatos de contas distintas para aparecer no mapa público.**

Isso significa que um mesmo usuário não pode aumentar a contagem enviando repetidamente a mesma confirmação.

O processo segue esta lógica:

| Relatos distintos | Situação |
|---|---|
| 1 de 6 | Ocorrência pendente |
| 2 a 5 de 6 | Aguardando novos relatos |
| 6 de 6 | Alerta publicado no mapa |

Depois da publicação, o alerta passa a ser disponibilizado para consulta no mapa público.

### 4. Consulta ao mapa

O mapa da Cityzer utiliza **React Leaflet e OpenStreetMap**.

Nele, os cidadãos podem:

- Explorar diferentes regiões.
- Consultar os alertas publicados.
- Filtrar ocorrências por categoria.
- Selecionar marcadores para visualizar detalhes.
- Atualizar as informações consultadas.

As ocorrências pendentes são apresentadas separadamente dos alertas publicados.

### 5. Verificação de permanência

Uma ocorrência publicada pode passar por uma nova verificação comunitária após o prazo definido para sua categoria.

Os usuários podem responder:

- **Sim, continua:** o problema permanece no local.
- **Não, foi resolvido:** o problema não está mais presente.

Após **três respostas negativas de contas distintas**, o alerta deixa de aparecer no mapa público, conforme as regras da aplicação.

Essa verificação é manual e depende da colaboração dos usuários.

## Regras de negócio

| Regra | Funcionamento |
|---|---|
| Publicação de alertas | Exige seis relatos de contas distintas |
| Primeiro relato | O registro do autor conta como primeiro relato |
| Ocorrências pendentes | Podem receber relatos de outros usuários da mesma cidade |
| Acidentes | Revisão liberada após 6 horas |
| Buracos | Revisão liberada após 24 horas |
| Alagamentos | Revisão liberada após 24 horas |
| Árvores caídas | Revisão liberada após 24 horas |
| Obras | Prazo de revisão ainda não definido |
| Remoção do alerta | Exige três respostas negativas de contas distintas |
| Edição e exclusão | Permitidas ao autor enquanto a ocorrência estiver pendente |
| Confirmação de localização | Manual, sem monitoramento automático por GPS |

Essas regras buscam reduzir relatos duplicados, limitar manipulações e manter a participação comunitária como elemento central da plataforma.

## Funcionalidades

### Acesso e gerenciamento de usuários

- Cadastro e login com Supabase Auth.
- Persistência da sessão autenticada.
- Logout.
- Seleção de cidade.

### Mapa e ocorrências

- Mapa interativo com seleção de coordenadas.
- Registro de ocorrências em cinco categorias.
- Filtros por tipo de problema.
- Consulta aos detalhes das ocorrências.
- Visualização de ocorrências pendentes e publicadas.
- Gerenciamento das próprias ocorrências.
- Criação, leitura, atualização e exclusão de registros (CRUD).

### Colaboração e validação

- Associação dos relatos às contas dos usuários.
- Contagem de relatos distintos.
- Publicação após seis relatos.
- Confirmação manual de permanência.
- Remoção após três respostas negativas distintas.

### Segurança

- Autenticação por Supabase Auth.
- Controle de autoria dos registros.
- Políticas de acesso com Row Level Security (RLS).
- Validação de regras colaborativas no banco de dados.

## Tecnologias utilizadas

| Tecnologia | Finalidade |
|---|---|
| React | Construção das interfaces e componentes |
| Vite | Ambiente de desenvolvimento e build |
| JavaScript | Lógica e interatividade |
| Tailwind CSS | Estilização e responsividade |
| React Leaflet | Integração do mapa interativo |
| OpenStreetMap | Dados cartográficos |
| Lucide React | Ícones da interface |
| Supabase Auth | Autenticação de usuários |
| Supabase PostgreSQL | Armazenamento das informações |
| Git e GitHub | Versionamento e repositório |
| Vercel | Hospedagem da aplicação |

## Organização da solução

A aplicação está dividida em três áreas principais.

**Interface:** componentes React responsáveis pelas telas, formulários, filtros, mapa e visualização responsiva.

**Interação:** navegação, autenticação, gerenciamento de ocorrências e participação dos usuários.

**Dados:** integração com o Supabase, armazenamento das ocorrências, políticas de acesso e validação das regras de negócio.

Essa organização busca facilitar a manutenção, a reutilização de componentes e a separação de responsabilidades.

## Instalação e execução local

### Pré-requisitos

- Node.js e npm instalados.
- Git instalado.
- Projeto Supabase configurado.
- Credenciais públicas do Supabase.
- Conexão com a internet.

### 1. Clonar o repositório

Clone o repositório utilizando o endereço disponibilizado no GitHub e acesse a pasta do projeto.

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie o arquivo `.env.local` na raiz do projeto, utilizando `.env.example` como referência:

```env
VITE_SUPABASE_URL=SUA_PROJECT_URL
VITE_SUPABASE_PUBLISHABLE_KEY=SUA_PUBLISHABLE_KEY
```

Substitua os valores pelas credenciais públicas do projeto Supabase.

**Segurança:** nunca utilize chaves `service_role` ou outras chaves administrativas no frontend. Não versione o arquivo `.env.local` com credenciais reais.

### 4. Configurar o banco de dados

No Supabase, execute os scripts SQL da pasta `supabase/` nesta ordem:

1. `estrutura_inicial.sql`
2. `autenticacao_perfis.sql`
3. `politicas_rls.sql`
4. `mapa_colaborativo.sql`
5. `validacao_colaborativa.sql`

Configure também o provedor de autenticação por e-mail e as URLs de redirecionamento autorizadas.

### 5. Iniciar a aplicação

```bash
npm run dev
```

Acesse o endereço informado pelo Vite, normalmente:

http://localhost:5173

## Como testar as funcionalidades

Para avaliar o fluxo colaborativo, recomenda-se utilizar contas de teste distintas.

### Teste de registro

1. Crie uma conta e selecione uma cidade.
2. Entre no mapa.
3. Selecione uma localização.
4. Preencha e registre uma ocorrência.
5. Verifique se ela aparece como pendente, com um relato contabilizado.

### Teste de colaboração

1. Entre com outra conta da mesma cidade.
2. Acesse a área de ocorrências aguardando relatos.
3. Localize a ocorrência criada anteriormente.
4. Contribua com um relato.
5. Verifique se a contagem foi atualizada.
6. Repita o processo com outras contas distintas até atingir seis relatos.

**Resultado esperado:** após o sexto relato válido, a ocorrência é publicada no mapa.

### Teste de gerenciamento

1. Entre com a conta responsável por uma ocorrência pendente.
2. Acesse a área de suas ocorrências.
3. Teste a edição dos dados permitidos.
4. Teste a exclusão com confirmação.
5. Verifique se as alterações permanecem após atualizar a página.

### Teste de verificação comunitária

Após o prazo de revisão da categoria, teste as respostas de permanência utilizando contas distintas.

**Resultado esperado:** três respostas negativas válidas retiram o alerta do mapa público.

Os testes devem respeitar os prazos e as restrições de acesso estabelecidos pelo sistema.

## Qualidade e build

Para executar as verificações locais:

```bash
npm run lint
npm run build
```

O build de produção é gerado na pasta `dist/`.

## Estrutura principal

```text
src/
  assets/
  components/
    celular/
    site/
  dados/
  estilos/
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
GUIA_DE_USO_Cityzer.md
README.md
```

## Segurança e boas práticas

A Cityzer utiliza autenticação e políticas de acesso no banco de dados para controlar as operações realizadas pelos usuários.

As regras colaborativas são implementadas por meio de operações e funções SQL, evitando depender exclusivamente de validações realizadas no navegador.

Também são adotados cuidados para:

- Restringir modificações aos usuários autorizados.
- Evitar relatos repetidos da mesma conta para uma ocorrência.
- Proteger operações de edição e exclusão.
- Não expor credenciais administrativas.
- Manter as informações associadas aos respectivos autores.

## Limitações

A Cityzer é um projeto acadêmico com foco em informação e colaboração comunitária.

Suas limitações incluem:

- A categoria de obras ainda não possui prazo de revisão definido.
- A localização das ocorrências é selecionada manualmente.
- Não existe verificação automática por passagem de GPS.
- Não há monitoramento contínuo e automático das condições das vias.
- Os dados são atualizados mediante consultas e ações do aplicativo, sem sincronização contínua em tempo real.
- A publicação e a retirada de alertas dependem da participação de contas distintas.
- A aplicação não realiza navegação GPS nem otimização de rotas.

**A Cityzer não substitui serviços oficiais de trânsito, emergência ou atendimento público.** As informações compartilhadas pela comunidade devem ser utilizadas como apoio, não como garantia das condições de uma via.

## Indicadores de impacto

A solução permite considerar os seguintes indicadores para avaliar seu uso e sua contribuição:

- Número de ocorrências registradas.
- Número de relatos colaborativos.
- Quantidade de alertas publicados.
- Quantidade de problemas sinalizados como resolvidos.
- Proporção de ocorrências resolvidas.
- Tempo entre o primeiro relato e a publicação de um alerta.

Esses indicadores representam possibilidades de acompanhamento da solução, não resultados estatísticos já comprovados.

## Uso de inteligência artificial

O desenvolvimento da Cityzer contou com assistência do ChatGPT em atividades de planejamento, organização da arquitetura, implementação de componentes, revisão de código e documentação.

O uso da inteligência artificial, as aplicações realizadas e as validações estão documentados no arquivo [AI.md](./AI.md).

## Projeto acadêmico

**Instituição:** FIAP

**Curso:** Engenharia de Software

**Projeto:** Global Solution 2026.2

**Desafio:** CitizenTech

**Disciplinas:**

- Web Development
- Front-End Design

A Cityzer foi desenvolvida como uma proposta tecnológica para ampliar a participação dos cidadãos na identificação e no acompanhamento de problemas que afetam a mobilidade urbana.