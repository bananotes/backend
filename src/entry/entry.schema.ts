import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Entry extends Document {
  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  url: string;

  @Prop({ type: { width: Number, height: Number }, required: true })
  size: { width: number; height: number };

  @Prop({ type: { x: Number, y: Number }, required: true })
  position: { x: number; y: number };

  @Prop({ type: Number, default: 0 })
  likes: number;

  @Prop({ type: Number, default: 0 })
  dislikes: number;

  @Prop({ default: Date.now })
  createTime: Date;

  @Prop({ default: Date.now })
  updateTime: Date;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const EntrySchema = SchemaFactory.createForClass(Entry);
