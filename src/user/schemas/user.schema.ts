import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  // @Prop()
  // status: number;

  @Prop()
  role: string;
  // role: {
  //   type: String,
  //   default: "user",
  // },

  @Prop()
  enabled :Boolean;
  // enabled: { type: Boolean, default: 'false' }
  // enabled: {
  //   type: Boolean,
  //   default: false,
  // }
  // @Prop()
  // createdAt :Date; 

  // @Prop()
  // updatedAt :Date;
  @Prop({ type: Date, required: true })
  createdAt: Date;
  @Prop({ type: Date, required: true })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);