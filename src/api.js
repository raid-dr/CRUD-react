import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getTasks() {
  const { data } = await client.get('/tasks');
  return data;
}

export async function getTask(id) {
  const { data } = await client.get(`/tasks/${id}`);
  return data;
}

export async function createTask(task) {
  const { data } = await client.post('/tasks', task);
  return data;
}

export async function updateTask(id, task) {
  const { data } = await client.put(`/tasks/${id}`, task);
  return data;
}

export async function deleteTask(id) {
  await client.delete(`/tasks/${id}`);
}
