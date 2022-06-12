import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // console.log('createUserDto=',createUserDto);
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async filterUser(username: string) {
    // return this.userModel.find({ $or: [{ username: username }, { lastname: username }] }).exec();
    return this.userModel.find({  username: username }).exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async findUser(username: string): Promise<User> {
    return this.userModel.findOne({ $or: [{ username: username },{ firstname: username }, { lastname: username }] }).exec();
  }

  async update(createUserDto: CreateUserDto, id: string): Promise<User> {
    const updatedUser = await this.userModel.findOneAndUpdate({ _id: id }, createUserDto);
    return updatedUser;
  }

  async delete(id: string) {
    const deletedUser = await this.userModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedUser;
  }

  async currentUser(req: any) {
    try {
      console.log('currentUser');
      const { authtoken } = req.body;
      // console.log('authtoken==', authtoken);
      return authtoken
      // return ' res.send(user);'
    } catch (err) {
      console.log(err);
      return JSON.stringify("Server Error!");
    }
  }

  async checkAdmin(req: any) {
    try {
      console.log('checkAdmin');
      const { username } = req.body
      // console.log('checkLogin=', username)
      const adminUser = await this.findUser(username);
      // console.log('adminUser.role =', adminUser.role);
      if (adminUser.role !== 'admin') {
        return JSON.stringify("Admin Access denied");
      } else {
        return adminUser.role
      }
    } catch (err) {
      console.log(err);
      return JSON.stringify("Admin Access denied");
    }
  }

}