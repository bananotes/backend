import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EntryDocument = Entry & Document;

@Schema()
export class Entry {
  @Prop({ required: true, unique: true })
  _id: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  url: string;

  @Prop({ type: { x: Number, y: Number }, required: true })
  position: {
    x: number;
    y: number;
  };

  @Prop({ type: { width: Number, height: Number }, required: true })
  size: {
    width: number;
    height: number;
  };

  @Prop({ type: [String], default: [] })
  likes: string[];

  @Prop({ type: [String], default: [] })
  dislikes: string[];

  @Prop({ type: [String], default: [] })
  invisibleEntries: string[];

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: Date.now })
  createTime: Date;

  @Prop({ default: Date.now })
  updateTime: Date;
}

export const EntrySchema = SchemaFactory.createForClass(Entry);
