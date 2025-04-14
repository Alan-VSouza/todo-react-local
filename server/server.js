const express = require('express');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');  // Arquivo de rotas para tarefas

const app = express();

app.use(cors()); // Permite requisições de origens diferentes
app.use(express.json()); // Para processar o JSON no corpo da requisição

app.use('/api/todos', todoRoutes); // Rota para as tarefas

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
