const express = require('express');
const router = express.Router();

// Criação de uma nova tarefa
router.post('/', (req, res) => {
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({ message: 'Task is required' });
  }

  const newTodo = {
    _id: Date.now().toString(),
    task,
    done: false,
  };
  
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Obtenção de todas as tarefas
router.get('/', (req, res) => {
  res.status(200).json(todos);
});

// Exclusão de uma tarefa
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const index = todos.findIndex(todo => todo._id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Task não encontrada' });
  }

  todos.splice(index, 1);
  res.status(200).json({ message: 'Task excluída com sucesso!' });
});

// Atualização do status de uma tarefa
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { done } = req.body;

  const todo = todos.find(todo => todo._id === id);
  if (!todo) {
    return res.status(404).json({ message: 'Task não encontrada' });
  }

  todo.done = done;
  res.status(200).json(todo);
});

module.exports = (todos) => router;
