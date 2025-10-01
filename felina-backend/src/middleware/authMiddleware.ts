import type { Request, Response, NextFunction } from 'express';
import { timingSafeEqual } from 'crypto';

export const verifyApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.get('X-API-Key');
  const expectedApiKey = process.env['TABLET_API_KEY'];

  if (!apiKey || !expectedApiKey) {
    return res.status(401).json({ message: 'Unauthorized: Invalid API Key configuration' });
  }

  const apiKeyBuffer = Buffer.from(apiKey);
  const expectedApiKeyBuffer = Buffer.from(expectedApiKey);

  if (apiKeyBuffer.length !== expectedApiKeyBuffer.length || !timingSafeEqual(apiKeyBuffer, expectedApiKeyBuffer)) {
    return res.status(401).json({ message: 'Unauthorized: Invalid API Key' });
  }

  next();
};