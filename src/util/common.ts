import { Request, Response, NextFunction } from 'express';
import joi, { Schema } from 'joi';
import { ValidationError } from './errors';

export function asyncMiddleware(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const value = await Promise.resolve(fn(req, res, next));
    } catch (e) {
      next(e);
    }
  };
}

export function validateParameters<T>(data: any, schema: Schema): T {
  try {
    return joi.attempt<T>(data, schema);
  } catch (e) {
    throw new ValidationError(e.message);
  }
}
