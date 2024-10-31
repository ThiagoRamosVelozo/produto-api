# Produto App

## Como executar localmente

### Dependências
- 🔶 [Node.js](https://nodejs.org/)
- 🐋 [Docker](https://www.docker.com/)
- 🐦 [Flutter](https://flutter.dev/)

### 1. Banco de dados
```
cd database;
docker compose up;
```
### 2. Backend
```
cd backend;
npx nodemon index.js;
```
OU
```
cd backend;
node index.js;
```
Obs: Não está sendo ignorado o arquivo de variáveis de ambiente, uma vez que contém informações para acesso de um banco de dados conteinerizado localmente, não um de produção/remoto.
### 3. Frontend
```
cd frontend;
flutter run;
```