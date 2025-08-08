// src/controllers/whatsapp.controller.ts
import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth';
import * as WAHA from '../services/waha.service';
import Session from '../models/session.model';
import Message from '../models/message.model';
import Contact from '../models/contact.model';
import ChatGroup from '../models/chatGroup.model';

export const generateQr = async (req: AuthenticatedRequest, res: Response) => {
  const sessionName = `session-${req.user?.userId}`;
  await Session.updateOne(
    { sessionName },
    { sessionName, userId: req.user?.userId, tenantId: req.user?.tenantId, linked: false },
    { upsert: true }
  );

  const qrData = await WAHA.getQrCode(sessionName);
  res.json({ session: sessionName, qr: qrData });
};

export const sendTextMessage = async (req: AuthenticatedRequest, res: Response) => {
  const { session, chatId, text } = req.body;

  const sent = await WAHA.sendMessage(session, chatId, text);
  await Message.create({
    tenantId: req.user?.tenantId,
    userId: req.user?.userId,
    sessionName: session,
    to: chatId,
    content: text,
  });

  res.json({ message: 'Sent', result: sent });
};

export const syncContacts = async (req: AuthenticatedRequest, res: Response) => {
  const { session } = req.params;
  const contacts = await WAHA.getContacts(session);

  const docs = contacts.map((c: any) => ({
    tenantId: req.user?.tenantId,
    userId: req.user?.userId,
    sessionName: session,
    contactId: c.id._serialized,
    name: c.name || c.pushname || c.verifiedName || '',
  }));

  await Contact.deleteMany({ sessionName: session });
  await Contact.insertMany(docs);

  res.json({ synced: docs.length });
};

export const syncGroups = async (req: AuthenticatedRequest, res: Response) => {
  const { session } = req.params;
  const groups = await WAHA.getGroups(session);

  const docs = groups.map((g: any) => ({
    tenantId: req.user?.tenantId,
    userId: req.user?.userId,
    sessionName: session,
    groupId: g.id._serialized,
    name: g.subject,
    participants: g.participants.map((p: any) => p.id._serialized),
  }));

  await ChatGroup.deleteMany({ sessionName: session });
  await ChatGroup.insertMany(docs);

  res.json({ synced: docs.length });
};