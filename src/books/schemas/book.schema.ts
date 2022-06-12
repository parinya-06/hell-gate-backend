import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop()
  title: string;

  @Prop()
  review: string;

  @Prop()
  price: number;
  
  @Prop()
  urlimg: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
