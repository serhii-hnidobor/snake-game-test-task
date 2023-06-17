import { NextFunction, Request, Response } from 'express';

const responseMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  if (res?.locals.error) {
    const err = res.locals.error;
    console.error(err);
    res.status(400).json({ error: true, message: err.message });
    next();
    return;
  }

  const data = res.locals.data;
  res.status(200);
  if (data) {
    res.json(data);
  } else {
    res.json({ message: 'successful' });
  }

  next();
};

export { responseMiddleware };
