import type { Request, Response, NextFunction } from 'express';

export function validateToken(req: Request, res: Response, next: NextFunction) {
  // Validate Gmail access token and extension origin
  // ...token validation logic...
  (req as any).user = {}; // Attach user info if valid
  next();
}

// Rate limiting middleware can be added here
