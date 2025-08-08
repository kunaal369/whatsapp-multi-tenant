// src/middlewares/permissions.ts
import { Request, Response, NextFunction } from 'express';
import Group from '../models/group.model';
import { AuthenticatedRequest } from './auth';

export const authorize = (requiredPermissions: string[]) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const group = await Group.findById(req.user?.groupId);
      if (!group) return res.status(403).json({ message: 'Group not found' });

      const hasPermission = requiredPermissions.every(p => group.permissions.includes(p));
      if (!hasPermission) return res.status(403).json({ message: 'Insufficient permissions' });

      next();
    } catch (err) {
      return res.status(500).json({ message: 'Authorization error', error: err });
    }
  };
};
