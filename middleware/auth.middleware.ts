import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../config/env.config';

interface AuthenticatedRequest extends Request {
  userId?: string;
}

const auth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.accessToken;
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET!) as jwt.JwtPayload & { aud: string };
    req.userId = decoded.aud;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default auth;