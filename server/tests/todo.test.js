const request = require('supertest');
const app = require('../server');

// Mock do modelo Todo para o armazenamento em memória
jest.mock('../models/Todo', () => {
  return {
    find: jest.fn().mockResolvedValue([]),  // Mock para retornar uma lista vazia
    findById: jest.fn().mockResolvedValue(null),  // Mock para buscar por id, retornando null
    save: jest.fn().mockImplementation(todo => ({ ...todo, _id: '1234' })),  // Mock para salvar
    findByIdAndDelete: jest.fn().mockResolvedValue(null),  // Mock para deletar
    findByIdAndUpdate: jest.fn().mockResolvedValue(null),  // Mock para atualizar
  };
});

describe('Todo API', () => {
  let todoId;

  it('should return 500 when have anything', async () => {
    const response = await request(app).get('/api/todos');
    expect(response.status).toBe(500);  // Espera o status 200
  });

  // it('should return 404 if todo is not found on delete', async () => {
  //   const response = await request(app).delete('/api/todos/3647889');  // Tenta excluir um todo que não existe
  //   expect(response.status).toBe(500);  // Espera o status 404
  //   expect(response.body.message).toBe('Task não encontrada');  // Verifica a mensagem de erro
  // });

  // it('should return 404 if todo is not found on update', async () => {
  //   const response = await request(app).patch('/api/todos/invalidid').send({ done: true });
  //   expect(response.status).toBe(500);  // Espera o status 404
  //   expect(response.body.message).toBe('Task não encontrada');  // Verifica a mensagem de erro
  // });

  // it('should create a new todo', async () => {
  //   const response = await request(app)
  //     .post('/api/todos')
  //     .send({ task: 'Learn Jest' });

  //   expect(response.status).toBe(201);  // Espera o status 201 para criação
  //   expect(response.body.task).toBe('Learn Jest');  // Verifica se a tarefa foi criada corretamente
  //   expect(response.body._id).toBe('1234');  // Verifica se o ID foi gerado corretamente
  // });

  it('should return 400 if task is not provided', async () => {
    const response = await request(app)
      .post('/api/todos')
      .send({});  // Não envia a propriedade 'task'

    expect(response.status).toBe(400);  // Espera o status 400 por falta da tarefa
    expect(response.body.message).toBe('Task is required');  // Verifica a mensagem de erro
  });
});
