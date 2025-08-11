import axios from 'axios';

export const isMultiSession = false; // force single session mode

export const WAHA_SESSION_PREFIX = '/session'; // singular

export const WAHA_API = axios.create({
  baseURL: process.env.WAHA_BASE_URL || 'http://waha:3000/api',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.WAHA_API_KEY || 'supersecretapikey',
  },
});
