# Todo List API

Este é um simples aplicativo **Todo List** desenvolvido com **Node.js**, **Express** para o backend e **React** para o frontend. A principal característica deste projeto é que ele **não utiliza MongoDB** ou qualquer outro banco de dados persistente, utilizando um **armazenamento em memória** para gerenciar as tarefas.

## Descrição do Projeto

O projeto permite ao usuário:

- **Adicionar tarefas**
- **Listar tarefas**
- **Excluir tarefas**
- **Marcar tarefas como concluídas**

Todas as tarefas são armazenadas em um **array** na memória do servidor, o que significa que ao reiniciar o servidor, as tarefas são perdidas. Este projeto é ideal para fins de aprendizado e para quem quer entender a interação entre frontend e backend em um sistema simples.

## Tecnologias Utilizadas

### Backend:
- **Node.js**
- **Express**
- **Axios** (para fazer requisições HTTP do frontend)
- **CORS** (para permitir o acesso do frontend ao backend)
- **Armazenamento em memória** (sem banco de dados persistente)

### Frontend:
- **React**
- **Axios** (para fazer requisições HTTP para o backend)
- **React Toastify** (para exibir notificações)
- **SweetAlert2** (para exibir pop-ups de confirmação)

## Como Rodar o Projeto com Docker

Este projeto pode ser facilmente executado utilizando Docker. Para isso, vamos utilizar um **Dockerfile** para o frontend e outro para o backend, além de um **docker-compose.yml** para orquestrar os serviços.

## 1. Configuração do Backend

O backend está configurado para ser executado usando **Node.js**. O Dockerfile para o backend está configurado para construir e rodar o servidor.

## Dockerfile para o Backend:

#### Usando a imagem oficial do Node.js
FROM node:16

WORKDIR /app

#### Copiar as dependências do backend
COPY server/package*.json ./
RUN npm install

#### Copiar o código do backend
COPY server/ .

#### Expor a porta onde o backend estará rodando
EXPOSE 3001

CMD ["node", "server.js"]

### 2. Configuração do Frontend

O frontend é um aplicativo React que será servido pelo Nginx. O Dockerfile para o frontend está configurado para construir o aplicativo com npm run build e servir os arquivos estáticos através do Nginx.

# Dockerfile para o Frontend:

#### - Usando a imagem oficial do Node.js
FROM node:16 AS builder

WORKDIR /app

#### - Copiar as dependências do frontend
COPY client/package*.json ./
RUN npm install

#### - Copiar o código do frontend
COPY client/ .

#### - Rodar o build da aplicação React
RUN npm run build

#### - Usar a imagem Nginx para servir os arquivos estáticos
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html

#### - Expor a porta do Nginx
EXPOSE 80

#### - Iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]

## 3. Orquestrando com Docker Compose

Utilizando docker-compose, podemos orquestrar o serviço de frontend, backend e banco de dados (se necessário). Aqui está o arquivo docker-compose.yml:

### docker-compose.yml:
```dockerfile
version: '3'
services:
  backend:
    build:
      context: .
      dockerfile: Dockerfile.backend
    container_name: backend-container
    ports:
      - "3001:3001"

  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    container_name: frontend-container
    ports:
      - "80:80"
    depends_on:
      - backend

  db:
    image: mysql:5.7
    container_name: mysql-container
    environment:
      MYSQL_ROOT_PASSWORD: example
      MYSQL_DATABASE: app_db
    ports:
      - "3306:3306"
```

## 4. Como Rodar o Projeto com Docker

Para rodar o projeto com Docker, siga os passos abaixo:

### Clone o repositório:

```bash
git clone https://github.com/Alan-VSouza/todo-react-local.git
cd todo-react-local
```

### Construir e rodar os containers:

No diretório onde está localizado o docker-compose.yml, execute o seguinte comando para construir as imagens e iniciar os containers:

```bash
docker-compose up --build
```

Isso irá construir as imagens do backend e frontend, além de configurar o banco de dados MySQL, se necessário.

## Acessar o Frontend e Backend:
- O frontend estará disponível em http://localhost.

- O backend estará disponível em http://localhost:3001.

## Parar os containers:
Para parar os containers, execute:

```bash
docker-compose down
```

## Como Funciona o Armazenamento de Tarefas

As tarefas são armazenadas em um **array** na memória do servidor, no arquivo `todoRoutes.js`. Não há nenhum banco de dados persistente sendo usado, portanto:

- **Ao adicionar uma tarefa**, ela é adicionada ao array `todos`.
- **Ao excluir uma tarefa**, a tarefa é removida do array.
- **Ao marcar uma tarefa como concluída**, o status `done` da tarefa é alterado.

Lembre-se de que, como o armazenamento é em memória, **todos os dados serão perdidos ao reiniciar o servidor**.

## Funcionalidades

### 1. Adicionar tarefa:
- Envia um `POST` para a rota `/api/todos` com o nome da tarefa.

   Exemplo:

   ```json
   { "task": "Comprar leite" }
   ```

### 2. Listar todas as tarefas:
- Envia um `GET` para a rota `/api/todos` e retorna um array com todas as tarefas.

### 3. Excluir tarefa:
- Envia um `DELETE` para a rota `/api/todos/{id}` com o ID da tarefa a ser excluída.

### 4. Marcar tarefa como concluída:
- Envia um `PATCH` para a rota `/api/todos/{id}` com o status `done` da tarefa alterado.

## Notas
- Este projeto utiliza **armazenamento em memória** e **não possui persistência de dados**.
- Ao reiniciar o servidor, **todas as tarefas serão perdidas**.
- O código de backend utiliza rotas simples de **GET**, **POST**, **DELETE** e **PATCH** para gerenciar as tarefas.

## Contribuição
Se você deseja contribuir com este projeto, fique à vontade para enviar um **pull request** ou abrir um **issue** caso encontre algum problema.

## Licença
Este projeto é de código aberto e licenciado sob a **MIT License**.
