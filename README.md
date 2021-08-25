# Trabalho Final para a Disciplina OTES-06

## Proposta

O usuário deste simples aplicativo pode examinar os dados dos objetos que passarão próximos à Terra nos próximos 7 dias, podendo favoritar um deles.

A aplicação explora 2 serviços:

1. Uma API da NASA, no *endpoint* que disponibiliza informações sobre passagem de objetos próximos à terra.

2. Serviço CRUD (pasta `core`) criado em Node.js com banco de dados SQLite para gestão dos nomes dos usuários e seus meteoros salvos.

## Requisitos

1. Node v14

3. Recomenda-se o uso do Yarn (`npm install --global yarn`)

## Utilização

1. Clone o repositório localmente.

2. Abra um terminal em `core` e rode os comandos `yarn install` e `yarn start`.

3. Abra um terminal em `mobile` e rode os comandos `yarn install` e `yarn start`.

4. Uma página do navegador se abrirá, de onde você poderá escanear o QR code, se possuir o app Expo Go, para rodar o aplicativo em seu dispositivo.

5. Alternativamente, você pode rodar o aplicativo no seu navegador, clicando em **Run in web browser**.