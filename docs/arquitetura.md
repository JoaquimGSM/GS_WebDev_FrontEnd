
# Arquitetura — Cityzer

## 1. Objetivo

Aplicação web colaborativa para registrar, visualizar e validar ocorrências que prejudicam a mobilidade urbana.

## 2. Estrutura

A aplicação será dividida em duas partes:

### Site
- Logo Cityzer no canto superior esquerdo.
- Fotografia real da Ponte Estaiada de São Paulo.
- Card explicativo ao lado do celular.
- Celular centralizado e responsivo.
- Nenhum menu ou formulário externo ao celular.

### Aplicativo
- Executado dentro da interface do celular.
- Tela de boas-vindas.
- Login e cadastro.
- Seleção de cidade.
- Mapa interativo.
- Registro e consulta de ocorrências.
- Filtros por categoria.
- Gerenciamento das próprias ocorrências.
- Confirmação de permanência dos problemas.

O aplicativo será uma aplicação web React, não um aplicativo nativo Android ou iOS.

## 3. Tecnologias

- React + Vite: interface e componentes.
- Tailwind CSS: estilização.
- React Router: navegação.
- Leaflet + OpenStreetMap: mapa.
- Supabase: autenticação, banco e API.
- Vercel: hospedagem.

## 4. Responsabilidades

- App.jsx: composição principal do site.
- components/site: apresentação visual externa.
- components/celular: moldura e telas do aplicativo.
- hooks: estado e lógica reutilizável.
- servicos: acesso à API e persistência.

## 5. Regras de negócio

- Cada usuário possui uma conta.
- O usuário seleciona sua cidade.
- Ocorrências podem receber relatos de usuários distintos.
- Após 6 relatos válidos de usuários distintos, uma ocorrência é publicada no mapa.
- Acidentes entram em verificação após 6 horas.
- Árvores caídas, buracos e alagamentos entram em verificação após 24 horas.
- O prazo para obras ainda precisa ser definido.
- Após 3 respostas negativas válidas de usuários distintos, a ocorrência é retirada do mapa público.
- A validação deve impedir votos duplicados.
- As regras críticas serão verificadas no backend.
- O protótipo terá confirmação manual, sem rastreamento contínuo do usuário.

## 6. Escopo da GS

Prioridade: mapa funcional, autenticação, API externa, CRUD completo e validação colaborativa.

Fora do escopo inicial:
- Navegação GPS.
- Cálculo de rotas.
- Rastreamento em segundo plano.
- Notificações push automáticas.
- Informações próprias de trânsito em tempo real.
