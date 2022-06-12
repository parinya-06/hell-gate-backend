import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HistorybookDocument = Historybook & Document;

@Schema()
export class Historybook {
  @Prop()
  title: string;

  @Prop()
  review: string;

  @Prop()
  price: string;

  @Prop()
  urlimg: string;
}

export const HistorybookSchema = SchemaFactory.createForClass(Historybook);