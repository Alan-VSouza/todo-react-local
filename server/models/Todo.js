const todos = [];

module.exports = {
  find: () => todos,
  findById: (id) => todos.find(todo => todo._id === id),
  save: (todo) => {
    todos.push(todo);
    return todo;
  },
  findByIdAndDelete: (id) => {
    const index = todos.findIndex(todo => todo._id === id);
    if (index === -1) return null;
    return todos.splice(index, 1)[0];
  },
  findByIdAndUpdate: (id, update) => {
    const todo = todos.find(todo => todo._id === id);
    if (!todo) return null;
    Object.assign(todo, update);
    return todo;
  }
};
