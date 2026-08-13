import axios from 'axios';


export const apiClient = axios.create({
  baseURL: 'http://10.59.94.125:4000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});