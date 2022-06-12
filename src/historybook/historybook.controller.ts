import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { HistorybookService } from './historybook.service';
import { CreateHistorybookDto } from './dto/create-historybook.dto';

@Controller('historybook')
export class HistorybookController {
    constructor(private readonly historybookService: HistorybookService) { }

    @Post()
    async create(@Body() createHistorybookDto: CreateHistorybookDto) {
        await this.historybookService.create(createHistorybookDto);
        return JSON.stringify(createHistorybookDto);
    }
}
