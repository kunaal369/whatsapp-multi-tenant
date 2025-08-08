import { Response } from 'express';
import { getGroups } from '../services/waha.service';
import ChatGroup from '../models/chatGroup.model';
import { AuthenticatedRequest } from '../middlewares/auth';

export const syncGroups = async (req: AuthenticatedRequest, res: Response) => {
  const { userId, tenantId } = req.user!;
  const sessionId = `session-${userId}`;

  try {
    const groups = await getGroups(sessionId);

    for (const g of groups.data) {
      await ChatGroup.findOneAndUpdate(
        { tenantId, userId, groupId: g.id },
        {
          $set: {
            name: g.name || '',
            participants: g.participants || [],
          },
        },
        { upsert: true, new: true }
      );
    }

    res.json({ message: 'Groups synced', count: groups.data.length });
  } catch (err) {
    console.error('Sync Groups Error:', err);
    res.status(500).json({ message: 'Group sync failed', error: err });
  }
};
