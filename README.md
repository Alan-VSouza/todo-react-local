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

## Como Rodar o Projeto

### 1. Configuração do Backend

Para rodar o backend:

1. Clone o repositório ou baixe o código do backend.

2. No diretório do backend, instale as dependências:

    ```bash
    npm install
    ```

3. Inicie o servidor backend:

    ```bash
    node server.js
    ```

   O servidor backend estará rodando em `http://localhost:5000`.

### 2. Configuração do Frontend

Para rodar o frontend:

1. Clone o repositório ou baixe o código do frontend.

2. No diretório do frontend, instale as dependências:

    ```bash
    npm install
    ```

3. Inicie o servidor frontend:

    ```bash
    npm start
    ```

   O frontend estará rodando em `http://localhost:3000`.

### 3. Testando a Aplicação

Após iniciar o backend e o frontend, abra o navegador e vá até `http://localhost:3000`. Você verá o aplicativo de **Todo List** com as funcionalidades de adicionar, excluir e marcar tarefas como concluídas.

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
