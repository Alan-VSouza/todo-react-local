const request = require('supertest');
const app = require('../server'); 

jest.mock('../models/Todo', () => ({
  find: jest.fn().mockResolvedValue([]),  
  findById: jest.fn().mockResolvedValue(null), 
  save: jest.fn().mockImplementation(todo => ({ ...todo, _id: '1234' })), 
  findByIdAndDelete: jest.fn().mockResolvedValue(null), 
  findByIdAndUpdate: jest.fn().mockResolvedValue(null),  
}));

describe('Todo API', () => {
  let todoId;

  it('should get all todos', async () => {
    const response = await request(app).get('/api/todos'); 
    expect(response.status).toBe(200);  
    expect(Array.isArray(response.body)).toBe(true); 
    expect(response.body.length).toBe(0); 
  });

  it('should return 404 if todo is not found on delete', async () => {
    const response = await request(app).delete('/api/todos/3647889'); 
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
      .send({});  
    expect(response.status).toBe(400); 
    expect(response.body.message).toBe('Task is required');  
  });

  afterAll(done => {
    done();
});
});
