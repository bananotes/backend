// src/user/schemas/user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ type: [String] })
  entries: string[];

  @Prop({ type: [String] })
  invisibleEntries: string[];

  @Prop({ default: Date.now })
  createdTime: Date;

  @Prop({ default: Date.now })
  updatedTime: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
