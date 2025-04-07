import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/tasks';

export const fetchTasks = () => axios.get(BASE_URL);
export const addTask = (task) => axios.post(BASE_URL, task);
export const deleteTask = (id) => axios.delete(`${BASE_URL}/${id}`);
export const updateTask = (id, task) => axios.put(`${BASE_URL}/${id}`, task);
