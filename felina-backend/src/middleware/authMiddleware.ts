import type { Request, Response, NextFunction } from 'express';

export const verifyApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.get('X-API-Key');
  if (!apiKey || apiKey !== process.env['TABLET_API_KEY']) {
    return res.status(401).json({ message: 'Unauthorized: Invalid API Key' });
  }
  next();
};
