import { UserRoleEnum } from 'src/enum/user-role.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  salt: string;

  @Prop({
    type: 'enum',
    enum: UserRoleEnum,
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
