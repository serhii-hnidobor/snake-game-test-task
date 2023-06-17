import { Schema } from 'ajv';
import { NextFunction, Request, Response } from 'express';
import { ajv } from '@services';

const validateSchema = (schema: Schema) => {
  const validate = ajv.compile(schema);

  return (req: Request, res: Response, next: NextFunction) => {
    const valid = validate(req.body);
    if (!valid) {
      const errors = validate.errors?.map((error) => `${error.message}`).join('; ');
      return res.status(400).json({ error: `Request body validation failed: ${errors}` });
    }
    next();
  };
};

export { validateSchema };
