import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://smart-home-builder-be.vercel.app/',
  headers: {
    'Content-Type': 'application/json',
  },
});