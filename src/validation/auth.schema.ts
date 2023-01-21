import { object, string, TypeOf } from 'zod';

export const registerUserSchema = {
  body: object({
    firstname: string({
      required_error: 'firstname is required',
    }),
    lastname: string({
      required_error: 'lastname is required',
    }),
    userType: string().optional(),
    password: string().min(6).max(12).optional(),
    email: string({
      required_error: 'email is required',
    }).email('email must be valid'),
  }),
};

export const loginSchema = {
  body: object({
    email: string({
      required_error: 'email is required',
    }).email('email must be valid'),
    password: string({
      required_error: 'password is required',
    })
      .min(6, 'Password must not be less than 6 characters')
      .max(12, 'password cannot be longer than 12 characters'),
  }),
};

export type RegisterUserBody = TypeOf<typeof registerUserSchema.body>;
export type LoginBody = TypeOf<typeof loginSchema.body>;
