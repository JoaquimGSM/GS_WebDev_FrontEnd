# AI.md — Uso de Inteligência Artificial

## Introdução

Durante o desenvolvimento do Cityzer, projeto realizado para a Global Solution do segundo semestre de 2026 da FIAP, utilizei o ChatGPT como uma ferramenta de apoio para tirar dúvidas, pesquisar soluções e resolver alguns problemas que apareceram durante a programação.

A ideia não era simplesmente utilizar uma ferramenta para gerar uma aplicação pronta, mas aproveitar a IA para entender melhor algumas tecnologias e encontrar caminhos para implementar as funcionalidades que havíamos planejado.

Ao longo do projeto, também aproveitei sugestões de código fornecidas pelo ChatGPT, principalmente nas partes de integração com o banco de dados e nas funções SQL.

## Como utilizei o ChatGPT

Uma das primeiras coisas em que utilizei a IA foi para pensar na organização do projeto. Como a aplicação teria diferentes telas e funcionalidades, procurei entender qual seria uma boa maneira de separar os componentes React, os hooks e os arquivos responsáveis pela comunicação com o banco de dados.

Outra parte em que precisei de ajuda foi na implementação do mapa. Pesquisei como utilizar o OpenStreetMap junto com o React Leaflet, principalmente para adicionar marcadores, trabalhar com coordenadas e permitir que o usuário selecionasse um ponto do mapa para registrar uma ocorrência.

A integração com o Supabase também exigiu algumas consultas. Utilizei o ChatGPT para entender como conectar a aplicação ao banco, configurar a autenticação dos usuários e realizar as operações de cadastro, consulta, edição e exclusão de ocorrências.

Na parte de SQL, a ferramenta teve uma participação maior. Busquei orientações para estruturar as tabelas, definir relacionamentos, configurar políticas de segurança e implementar as funções responsáveis pelas regras de validação do Cityzer.

Essas regras incluem a necessidade de seis relatos de usuários diferentes para publicar uma ocorrência e três confirmações negativas para removê-la do mapa.

## Exemplos de prompts utilizados

Grande parte das minhas interações com a IA aconteceu enquanto eu estava programando e encontrava alguma dúvida ou erro.

Alguns exemplos representativos das perguntas feitas foram:

> Como posso consumir os dados do OpenStreetMap no React e permitir que o usuário interaja com o mapa?

> Como faço para integrar o meu projeto ao Supabase e salvar os registros no banco de dados?

> Estou recebendo esse erro no terminal. O que está causando isso e como posso resolver? [Captura de tela]

> Corrija esse código SQL e explique por que ele não está funcionando.


Esses exemplos foram organizados e reformulados para representar os assuntos das consultas, não sendo necessariamente transcrições exatas das mensagens.

Também houve situações em que enviei diretamente capturas de tela do VS Code ou do Supabase para identificar problemas que não estava conseguindo resolver.

## Aplicação das respostas

As respostas foram utilizadas em diferentes momentos do desenvolvimento, principalmente quando eu precisava integrar uma nova funcionalidade ou resolver algum problema.

Por exemplo, na implementação do mapa, as orientações ajudaram a compreender como utilizar os componentes do React Leaflet e como trabalhar com os eventos de clique e as coordenadas geográficas.

Já no Supabase, utilizei tanto explicações quanto sugestões de código para implementar as funções de acesso ao banco e as regras de negócio. Alguns arquivos e trechos de código foram elaborados com auxílio direto da IA e depois integrados à aplicação.

Também utilizei o ChatGPT para revisar a organização do código e resolver problemas relacionados ao React.

O processo foi feito por etapas. Após adicionar ou modificar algum trecho, eu executava o projeto para verificar o resultado. Quando algo não funcionava como esperado, procurava identificar a mensagem de erro e investigar o que precisava ser alterado.

## Problemas encontrados e testes

Nem todas as soluções funcionaram de primeira. Durante o desenvolvimento, apareceram alguns erros que precisaram ser investigados.

Um deles aconteceu na conexão com o Supabase. A aplicação ficou com a tela branca porque as variáveis de ambiente estavam configuradas com um prefixo incompatível com o Vite. Depois de analisar o erro no console, corrigi os nomes das variáveis e reiniciei o servidor.

Outro problema ocorreu quando o mapa tentou acessar uma função SQL que ainda não estava disponível no banco de dados. Nesse caso, precisei verificar as funções existentes no Supabase, executar os scripts necessários e atualizar o cache da API.

Também encontrei erros do ESLint relacionados ao uso de hooks do React, que exigiram alterações em alguns componentes e hooks personalizados.

Para verificar as funcionalidades, utilizei o navegador, o console, o terminal do VS Code e o SQL Editor do Supabase. Fiz testes de autenticação, cadastro de ocorrências, edição, exclusão e participação no sistema de relatos e confirmações.

Além disso, utilizei os comandos `npm run lint` e `npm run build` para identificar problemas no código e na compilação.

## Minha experiência utilizando IA

No geral, o ChatGPT ajudou bastante, principalmente quando eu precisava entender alguma parte da integração entre React, Supabase e PostgreSQL.

Achei especialmente útil poder enviar um erro específico e receber uma explicação sobre o que poderia estar causando o problema, em vez de pesquisar várias soluções diferentes sem saber qual se aplicava ao projeto.

Por outro lado, percebi que não dá para confiar em todas as respostas sem testar. Algumas sugestões precisaram ser corrigidas, e houve situações em que uma alteração resolveu determinado problema, mas exigiu outros ajustes para funcionar junto com o restante da aplicação.

Isso mostrou a importância de acompanhar o funcionamento do código, entender as mudanças realizadas e não considerar uma funcionalidade concluída apenas porque ela foi implementada.
