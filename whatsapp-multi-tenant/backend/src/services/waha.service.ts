import axios from 'axios';

export const WAHA_API = axios.create({
  baseURL: process.env.WAHA_BASE_URL || 'http://waha:3000/api', // docker-compose hostname
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.WAHA_API_KEY || 'supersecretapikey',
  },
});

export const startSession = async () => {
  // CORE does not have startSession endpoint, so just resolve
  return Promise.resolve({ message: 'startSession not required on CORE' });
};

export const getQrCode = async (session = 'default', retries = 10, delayMs = 2000) => {
  const url = `/session/${session}/qr`;  // include session name here

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await WAHA_API.get(url);
      console.log(`[WAHA] QR fetched for ${session} (attempt ${attempt})`);
      return res.data;
    } catch (err: any) {
      if (err.response?.status === 404) {
        console.warn(`[WAHA] QR not ready for ${session} (attempt ${attempt}/${retries})`);
        if (attempt < retries) {
          await new Promise(r => setTimeout(r, delayMs));
          continue;
        }
      }
      err.message = `[WAHA getQrCode ${session}] ${err.message}`;
      console.error(err.message);
      throw err;
    }
  }
  throw new Error(`QR code not available for ${session} after ${retries} retries`);
};

export const getContacts = async () => {
  const res = await WAHA_API.get(`/session/contacts`);
  return res.data;
};

export const getGroups = async () => {
  const res = await WAHA_API.get(`/session/groups`);
  return res.data;
};

export const sendMessage = async (chatId: string, text: string) => {
  const res = await WAHA_API.post(`/session/send-message`, {
    chatId,
    text,
  });
  return res.data;
};
