const express = require('express');
const router = express.Router();

let todos = [];

router.post('/', (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ message: 'Task is required' });
  }

  const newTodo = { task, done: false, _id: String(todos.length + 1) };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

router.get('/', (req, res) => {
  res.status(200).json(todos);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex((todo) => todo._id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Task não encontrada' });
  }

  todos.splice(index, 1);
  res.status(200).json({ message: 'Task excluída com sucesso!' });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { done } = req.body;
  const todo = todos.find((todo) => todo._id === id);

  if (!todo) {
    return res.status(404).json({ message: 'Task não encontrada' });
  }

  todo.done = done;
  res.status(200).json(todo);
});

module.exports = router;
