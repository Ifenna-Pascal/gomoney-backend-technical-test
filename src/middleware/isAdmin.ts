import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { AccessTokenError } from '../core/ApiError';
import { USERTYPE } from '../database/model/user.model';
import { getUser } from '../database/repository/user.repo';

const isAdmin = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  const admin = await getUser({ _id: user.id, userType: USERTYPE.ADMIN });
  if (!admin) {
    throw new AccessTokenError('admin route only');
  }
  return next();
});

export default isAdmin;
