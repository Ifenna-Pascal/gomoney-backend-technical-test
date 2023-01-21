import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { AccessTokenError } from '../core/ApiError';

const isAuth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  if (!user) {
    throw next(new AccessTokenError('UnAuthorized'));
  }
  return next();
});

export default isAuth;
