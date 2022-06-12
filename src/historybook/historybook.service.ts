import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHistorybookDto } from './dto/create-historybook.dto';
import { Historybook,HistorybookDocument } from './schemas/historybook.schema';

@Injectable()
export class HistorybookService {
    constructor(
        @InjectModel(Historybook.name) private readonly  historybookModel: Model<HistorybookDocument>,
      ) {}
    
      async create(createHistorybookDto: CreateHistorybookDto): Promise<Historybook> {
        const createdCat = await this.historybookModel.create(createHistorybookDto);
        return createdCat;
      }
}
