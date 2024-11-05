# Produto App

## Como executar localmente

### Dependências
- 🔶 [Node.js](https://nodejs.org/)
- 🟥 [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- 🐋 [Docker](https://www.docker.com/)

### 1. Banco de dados
```
cd database;
docker compose up;
```
### 2. API
```
cd backend;
npm i;
node index.js;
```
Obs: Não está sendo ignorado o arquivo de variáveis de ambiente, uma vez que contém informações para acesso de um banco de dados conteinerizado localmente, não um de produção/remoto.
