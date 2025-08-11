import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../services/jwt.service';
import Group from '../models/group.model'; // ✅ Use Mongoose Group model

export interface AuthenticatedRequest extends Request {
  user?: {
    tenantId: string;
    userId: string;
    groupId: string;
    permissions: string[];
  };
}

export const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access token required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyAccessToken(token) as any;

    // 🔄 Fetch group permissions from DB
    const group = await Group.findById(decoded.groupId);
    if (!group) {
      return res.status(403).json({ message: 'User group not found' });
    }

    req.user = {
      tenantId: decoded.tenantId,
      userId: decoded.userId,
      groupId: decoded.groupId,
      permissions: group.permissions || [],
    };

    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
