const request = require('supertest');
const app = require('../server');

// Mock do modelo Todo para o armazenamento em memória
jest.mock('../models/Todo', () => ({
  find: jest.fn().mockResolvedValue([]), // Mock para retornar uma lista vazia
  findById: jest.fn().mockResolvedValue(null),  // Mock para buscar por id, retornando null
  save: jest.fn().mockImplementation(todo => ({ ...todo, _id: '1234' })),  // Mock para salvar
  findByIdAndDelete: jest.fn().mockResolvedValue(null), // Mock para deletar
  findByIdAndUpdate: jest.fn().mockResolvedValue(null),  // Mock para atualizar
}));

describe('Todo API', () => {
  let todoId;

  it('should get all todos', async () => {
    const response = await request(app).get('/api/todos');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(0); // Espera um array vazio
  });

  it('should return 404 if todo is not found on delete', async () => {
    const response = await request(app).delete('/api/todos/3647889'); // ID que não existe
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Task não encontrada');
  });

  it('should return 404 if todo is not found on update', async () => {
    const response = await request(app).patch('/api/todos/invalidid').send({ done: true });
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Task não encontrada');
  });

  it('should return 400 if task is not provided', async () => {
    const response = await request(app)
      .post('/api/todos')
      .send({});  // Não envia a propriedade 'task'

    expect(response.status).toBe(400);  // Espera o status 400 por falta da tarefa
    expect(response.body.message).toBe('Task is required');  // Verifica a mensagem de erro
  });
});
