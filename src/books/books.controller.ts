import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './schemas/book.schema';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    @Post('/crbook')
    async create(@Body() createCatDto: CreateBookDto) {
        await this.booksService.create(createCatDto);
        return JSON.stringify(createCatDto);
    }

    @Get()
    async findAll(): Promise<Book[]> {
        return this.booksService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Book> {
        return this.booksService.findOne(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.booksService.delete(id);
    }

    @Put('/update-book/:id')
    async updateBook(@Param('id') id: string, @Body() createUserDto: CreateBookDto) {
        console.log('updateBook=',createUserDto);
        
        return this.booksService.update(createUserDto, id);
    }
}
