import { Request, Response } from 'express';
import * as WAHA from '../services/waha.service';
import Session from '../models/session.model';
import Message from '../models/message.model';
import Contact from '../models/contact.model';
import ChatGroup from '../models/chatGroup.model';

const SESSION_NAME = 'default'; // fixed session for CORE

export const generateQr = async (req: Request, res: Response) => {
  try {
    // No need to call startSession in CORE
    const qr = await WAHA.getQrCode(SESSION_NAME).catch(() => null);

    // Save or update session info in DB (optional)
    await Session.updateOne(
      { sessionName: SESSION_NAME },
      { sessionName: SESSION_NAME, userId: 'system', tenantId: 'default', linked: false },
      { upsert: true }
    );

    res.json({ session: SESSION_NAME, qr });
  } catch (err: any) {
    console.error('generateQr error:', err?.message || err);
    res.status(500).json({ error: err?.message || 'failed to generate qr' });
  }
};

export const sendTextMessage = async (req: Request, res: Response) => {
  try {
    const { chatId, text } = req.body;
    if (!chatId || !text) {
      return res.status(400).json({ error: 'Missing chatId or text' });
    }

    const sent = await WAHA.sendMessage(chatId, text);

    await Message.create({
      tenantId: (req as any).user?.tenantId || 'default',
      userId: (req as any).user?.userId || 'system',
      sessionName: SESSION_NAME,
      to: chatId,
      content: text,
    });

    res.json({ message: 'Sent', result: sent });
  } catch (err: any) {
    console.error('sendTextMessage error:', err?.message || err);
    res.status(500).json({ error: err?.message || 'failed to send message' });
  }
};

export const syncContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await WAHA.getContacts();

    const docs = contacts.map((c: any) => ({
      tenantId: (req as any).user?.tenantId || 'default',
      userId: (req as any).user?.userId || 'system',
      sessionName: SESSION_NAME,
      contactId: c.id?._serialized ?? c.id,
      name: c.name || c.pushname || c.verifiedName || '',
    }));

    await Contact.deleteMany({ sessionName: SESSION_NAME });
    await Contact.insertMany(docs);

    res.json({ synced: docs.length });
  } catch (err: any) {
    console.error('syncContacts error:', err?.message || err);
    res.status(500).json({ error: err?.message || 'failed to sync contacts' });
  }
};

export const syncGroups = async (req: Request, res: Response) => {
  try {
    const groups = await WAHA.getGroups();

    const docs = groups.map((g: any) => ({
      tenantId: (req as any).user?.tenantId || 'default',
      userId: (req as any).user?.userId || 'system',
      sessionName: SESSION_NAME,
      groupId: g.id?._serialized ?? g.id,
      name: g.subject,
      participants: (g.participants || []).map((p: any) => p.id?._serialized ?? p.id),
    }));

    await ChatGroup.deleteMany({ sessionName: SESSION_NAME });
    await ChatGroup.insertMany(docs);

    res.json({ synced: docs.length });
  } catch (err: any) {
    console.error('syncGroups error:', err?.message || err);
    res.status(500).json({ error: err?.message || 'failed to sync groups' });
  }
};
