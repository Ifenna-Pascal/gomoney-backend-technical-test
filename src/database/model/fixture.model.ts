import { prop, Ref, getModelForClass } from '@typegoose/typegoose';
import { Team } from './teams.model';

export enum STATUSTYPE {
  PENDING = 'pending',
  COMPLETED = 'completed',
}

export class Fixture {
@prop({ required: true, ref: () => Team })
  public home!: Ref<Team>;

  @prop({ required: true, ref: () => Team })
  public away!: Ref<Team>;
  
  @prop({default:0})
  public homeScore?: number;

  @prop({default:0})
  public awayScore?: number;

  @prop({enum: STATUSTYPE, default: STATUSTYPE.PENDING})
  public status?: string;
}

export const FixtureModel = getModelForClass(Fixture, {
  schemaOptions: {
    timestamps: true,
  },
});
