// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import User from '../models/user.model';
import Group from '../models/group.model';
import { AuthenticatedRequest } from '../middlewares/auth';

export const createUser = async (req: AuthenticatedRequest, res: Response) => {
  const { username, password, groupId } = req.body;

  try {
    const user = new User({
      username,
      password,
      groupId,
      tenantId: req.user?.tenantId,
    });
    await user.save();
    res.status(201).json({ message: 'User created', userId: user._id });
  } catch (err) {
    res.status(400).json({ message: 'User creation failed', error: err });
  }
};

export const assignUserToGroup = async (req: AuthenticatedRequest, res: Response) => {
  const { groupId } = req.body;
  const { userId } = req.params;

  try {
    const group = await Group.findById(groupId);
    if (!group || group.tenantId !== req.user?.tenantId)
      return res.status(403).json({ message: 'Group not found or not allowed' });

    const user = await User.findByIdAndUpdate(userId, { groupId }, { new: true });
    res.json({ message: 'User group updated', user });
  } catch (err) {
    res.status(400).json({ message: 'Failed to assign group', error: err });
  }
};

export const getUsers = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const users = await User.find({ tenantId: req.user?.tenantId }).populate('groupId');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err });
  }
};
