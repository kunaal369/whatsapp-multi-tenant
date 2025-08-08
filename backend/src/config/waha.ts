// src/config/waha.ts
import axios from 'axios';

export const WAHA_API = axios.create({
  baseURL: process.env.WAHA_BASE_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
