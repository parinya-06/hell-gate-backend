import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HistorybookController } from './historybook.controller';
import { HistorybookService } from './historybook.service';
import { Historybook,HistorybookSchema } from './schemas/historybook.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Historybook.name, schema: HistorybookSchema }])],
  controllers: [HistorybookController],
  providers: [HistorybookService]
})
export class HistorybookModule {}
