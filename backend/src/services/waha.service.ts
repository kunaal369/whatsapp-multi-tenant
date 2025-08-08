// src/services/waha.service.ts
import { WAHA_API } from '../config/waha';

export const getQrCode = async (session: string) => {
  const res = await WAHA_API.get(`/${session}/qr`);
  return res.data;
};

export const getContacts = async (session: string) => {
  const res = await WAHA_API.get(`/${session}/contacts`);
  return res.data;
};

export const getGroups = async (session: string) => {
  const res = await WAHA_API.get(`/${session}/groups`);
  return res.data;
};

export const sendMessage = async (session: string, chatId: string, text: string) => {
  const res = await WAHA_API.post(`/${session}/send-message`, {
    chatId,
    text,
  });
  return res.data;
};
