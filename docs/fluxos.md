
# Fluxos de navegação — Cityzer

## Fluxo 1 — Acesso

1. Usuário acessa o site.
2. Visualiza o celular com a tela de boas-vindas.
3. Escolhe entrar ou criar conta.
4. Após autenticação, seleciona sua cidade.
5. Acessa o mapa principal.

## Fluxo 2 — Registrar ocorrência

1. Usuário acessa o mapa.
2. Seleciona a opção de registrar ocorrência.
3. Marca a localização.
4. Escolhe a categoria.
5. Preenche a descrição.
6. Confirma o envio.
7. O relato é armazenado no Supabase.
8. A ocorrência permanece pendente até atingir 6 relatos válidos de usuários distintos.

## Fluxo 3 — Visualizar ocorrências

1. Usuário acessa o mapa.
2. Visualiza ocorrências publicadas.
3. Pode filtrar por categoria.
4. Seleciona um marcador.
5. Visualiza detalhes e status.

## Fluxo 4 — Confirmar ocorrência

1. Uma ocorrência atinge o período de verificação.
2. Usuário autenticado acessa a ocorrência.
3. Informa se o problema continua.
4. O sistema registra a resposta.
5. Após 3 respostas negativas válidas de usuários distintos, a ocorrência deixa de aparecer no mapa público.

## Fluxo 5 — Gerenciar ocorrências

1. Usuário acessa Minhas Ocorrências.
2. Consulta seus registros.
3. Pode editar ou excluir registros próprios, conforme as regras definidas.
4. As alterações são persistidas na API.
5. O aplicativo atualiza a interface.

## Navegação

A navegação acontece somente dentro do celular.

O site de apresentação permanece visualmente fixo.

As telas serão desenvolvidas como componentes React reutilizáveis.
