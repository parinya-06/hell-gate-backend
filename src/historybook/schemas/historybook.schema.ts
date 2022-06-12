import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HistorybookDocument = Historybook & Document;

@Schema()
export class Historybook {
  @Prop()
  username: string;

  @Prop()
  book: string;

  @Prop()
  price: string;
}

export const HistorybookSchema = SchemaFactory.createForClass(Historybook);