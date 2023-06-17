import { NextFunction } from 'express';

export default function logger3(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('Request3...');
  next();
}
