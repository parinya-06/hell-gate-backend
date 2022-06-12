import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { Book, BookDocument } from './schemas/book.schema';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
  ) { }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const createdCat = await this.bookModel.create(createBookDto);
    return createdCat;
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findOne(id: string): Promise<Book> {
    return this.bookModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedCat = await this.bookModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCat;
  }

  async update(createBookDto: CreateBookDto, id: string): Promise<Book> {
    const updatedBook = await this.bookModel.findOneAndUpdate({ _id: id }, createBookDto);
    return updatedBook;
  }
}
