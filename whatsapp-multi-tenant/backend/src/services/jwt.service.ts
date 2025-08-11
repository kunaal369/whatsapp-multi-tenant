import jwt from 'jsonwebtoken';

export interface JwtPayload {
  tenantId: string;
  userId: string;
  groupId: string;
}

// Secret + duration
const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your_refresh_secret';
const ACCESS_EXPIRES_IN = '1h'; // or use process.env.JWT_EXPIRES_IN ?? '1h'
const REFRESH_EXPIRES_IN = '7d'; // or use process.env.JWT_REFRESH_EXPIRES_IN ?? '7d'

// ✅ This works: don't type payload, just use object literal + cast
export const generateAccessToken = (payload: JwtPayload): string => {
  return jwt.sign(
    {
      tenantId: payload.tenantId,
      userId: payload.userId,
      groupId: payload.groupId,
    },
    JWT_SECRET,
    { expiresIn: ACCESS_EXPIRES_IN } // ✅ No red underline
  );
};

export const generateRefreshToken = (payload: JwtPayload): string => {
  return jwt.sign(
    {
      tenantId: payload.tenantId,
      userId: payload.userId,
      groupId: payload.groupId,
    },
    JWT_REFRESH_SECRET,
    { expiresIn: REFRESH_EXPIRES_IN }
  );
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_REFRESH_SECRET) as JwtPayload;
};
