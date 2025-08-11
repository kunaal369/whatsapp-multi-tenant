// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.model';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../services/jwt.service';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  // console.log('Entered Password:', password);

  const user = await User.findOne({ username }).populate('groupId');
  // console.log('User:', user);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  console.log("Entered:", password);
console.log("Stored :", user.password);
console.log("Match  :", isMatch);
  // console.log('Password Match:', isMatch);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

const payload = {
  tenantId: user.tenantId.toString(),
  userId: user._id.toString(),
  groupId: user.groupId?._id?.toString() || '',
};

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: false, // Set to true in production with HTTPS
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.json({ accessToken });
};

export const refresh = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  try {
    const decoded = verifyRefreshToken(token);
    const accessToken = generateAccessToken(decoded);
    res.json({ accessToken });
  } catch {
    return res.sendStatus(403);
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('refreshToken');
  res.sendStatus(204);
};
