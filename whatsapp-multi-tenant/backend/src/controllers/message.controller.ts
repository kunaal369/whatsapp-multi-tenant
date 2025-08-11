import { Response } from 'express';
import Message from '../models/message.model';
import { AuthenticatedRequest } from '../middlewares/auth';

export const getMessages = async (req: AuthenticatedRequest, res: Response) => {
  const { tenantId } = req.user!;

  try {
    const messages = await Message.find({ tenantId }).sort({ timestamp: -1 });
    res.json({ messages });
  } catch (err) {
    console.error('Get Messages Error:', err);
    res.status(500).json({ message: 'Failed to fetch messages', error: err });
  }
};
