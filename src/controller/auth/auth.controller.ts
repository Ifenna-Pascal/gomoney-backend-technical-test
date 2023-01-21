import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { createUser, findUserByEmail, findUserById } from '../../database/repository/user.repo';
import { AuthFailureError } from '../../core/ApiError';
// import { generatepassword } from '../../utils/randoms';
import { SuccessResponse } from '../../core/ApiResponse';
import { signJwt } from '../../utils/jwt';
import { LoginBody, RegisterUserBody } from '../../validation/auth.schema';
import { USERTYPE } from '../../database/model/user.model';
// import { sendRegistrationMail } from '../../services/mailer/functions';

const registerUser = asyncHandler(async (req: Request<RegisterUserBody>, res: Response) => {
  console.log(req.body);
  const { firstname, lastname, email, password, userType} = req.body;
  const user = await findUserByEmail(email);
  if (user) throw new AuthFailureError('User with email already exists');
  const newUser = await createUser({
    firstname,
    lastname,
    email,
    userType: userType ? userType :  USERTYPE.USER,
    password,
  });
  const token = await signJwt({ id: newUser?._id });
  // req.session.token = token;
//   const details = { to: email, password: passwords, fullname: `${firstname} + ${lastname}` };
//   const result = await sendRegistrationMail(details);
//   if (!result) throw new AuthFailureError('email not send, validation error');
  new SuccessResponse('user created successfully', { user: newUser, token: token }).send(res);
});

const loginUser = asyncHandler(async (req: Request<LoginBody>, res: Response) => {
  const { email, password } = req.body;
  console.log(password, 'password');
  const user = await findUserByEmail(email);
  if (!user) throw new AuthFailureError('user not found');
  if (!(await user.comparePassword(password))) throw new AuthFailureError('password mismatch');
  const token = await signJwt({ id: user?._id });
  // req.session.token = token; 
  new SuccessResponse('user logged in successfully', { user: user, token: token }).send(res);
});

const userProfile = asyncHandler(async (req: Request, res: Response) => {
  const { id } = res.locals.user;
  const user = await findUserById(id);
  if (!user) throw new AuthFailureError('user not found');
  new SuccessResponse('user logged in successfully', { user }).send(res);
});

export { registerUser, loginUser, userProfile };
