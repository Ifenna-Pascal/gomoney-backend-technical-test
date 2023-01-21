import { prop, pre, getModelForClass } from '@typegoose/typegoose';

export class Team {
  @prop()
  public name?: string;

  @prop()
  public teamCEO?: string;
  
  @prop()
  public yearOfEstablisment?: string;

  @prop()
  public location?: string;

  @prop()
  public nickName?: string;
    length!: number;
}

export const TeamModel = getModelForClass(Team, {
  schemaOptions: {
    timestamps: true,
  },
});
