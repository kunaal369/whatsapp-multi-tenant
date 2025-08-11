import { Response } from 'express';
import { getContacts } from '../services/waha.service';
import Contact from '../models/contact.model';
import { AuthenticatedRequest } from '../middlewares/auth';

export const syncContacts = async (req: AuthenticatedRequest, res: Response) => {
  const { userId, tenantId } = req.user!;
  const sessionId = `session-${userId}`;

  try {
    // Remove sessionId param, since CORE mode does not accept it
    const contacts = await getContacts();

    for (const c of contacts.data) {
      await Contact.findOneAndUpdate(
        { tenantId, userId, contactId: c.id },
        {
          $set: {
            name: c.name || '',
          },
        },
        { upsert: true, new: true }
      );
    }

    res.json({ message: 'Contacts synced', count: contacts.data.length });
  } catch (err: unknown) {
    console.error('Sync Contacts Error:', err);
    res.status(500).json({ message: 'Contact sync failed', error: (err instanceof Error) ? err.message : err });
  }
};
