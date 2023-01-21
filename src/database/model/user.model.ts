import { prop, pre, getModelForClass } from '@typegoose/typegoose';
import argon2 from 'argon2';

export enum USERTYPE {
  ADMIN = 'admin',
  USER = 'user',
}

@pre<User>('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const hash = await argon2.hash(this.password);
    this.password = hash;
    return next();
  }
})
export class User {
  @prop()
  public firstname?: string;

  @prop()
  public lastname?: string;

  @prop({
    unique: true,
    validate: {
      validator: (value: string) => {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value);
      },
      message: 'kindly enter a valid email address',
    },
  })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  @prop({ enum: USERTYPE, default: USERTYPE.USER })
  public userType?: USERTYPE;

  public async comparePassword(password: string): Promise<boolean> {
    return await argon2.verify(this.password, password);
  }
}

export const userModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
  },
});
