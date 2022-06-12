import { Body, Controller, Request, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('/register')
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = {
      username: createUserDto.username,
      password: createUserDto.password,
      firstname: createUserDto.firstname,
      lastname: createUserDto.lastname,
      // status: 1,
      role: 'user',
      enabled: true,
      createdAt: Date(),
      updatedAt: Date(),
    }
    // console.log('newUser=', newUser);
    // await this.usersService.create(newUser);
    // return JSON.stringify(newUser);
    return this.usersService.create(newUser);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('f')
  async filterUser(@Query('username') username: string): Promise<User> {
    return this.usersService.findUser(username);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  // @Get(':username')
  // async findUser(@Param('username') username: string): Promise<User> {
  //   console.log(1);
  //   return this.usersService.findUser(username);
  // }

  // @Put(':id')
  // async update(@Param('id') id: string, @Body() createUserDto: CreateUserDto) {
  //   return this.usersService.update(createUserDto, id);
  // }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }

  @Post('/search')
  async searchUser(@Request() req): Promise<User> {
    console.log(1);
    const { username } = req.body
    console.log('username=', username);
    return this.usersService.findUser(username);
  }

  @Post('/current-user')
  async currentUser(@Request() req) {
    // console.log('req=',req)
    // const { authtoken } = req.body;
    // console.log('username==',authtoken)
    return this.usersService.currentUser(req);
  }

  @Post('/current-admin')
  async checkAdmin(@Request() req) {
    console.log('req=', req)
    const { username } = req.body;
    console.log('username==', username)
    return this.usersService.checkAdmin(req);
  }

  @Put('/change-status/:id')
  async changeStatus(@Param('id') id: string, @Body() createUserDto: CreateUserDto) {
    const editUser = {
      username: createUserDto.username,
      password: createUserDto.password,
      firstname: createUserDto.firstname,
      lastname: createUserDto.lastname,
      role: createUserDto.role,
      enabled: createUserDto.enabled,
      createdAt: createUserDto.createdAt,
      updatedAt: Date(),
    }
    return this.usersService.update(editUser, id);
  }

  @Put('/change-role/:id')
  async changeRole(@Param('id') id: string, @Body() createUserDto: CreateUserDto) {
    const editUser = {
      username: createUserDto.username,
      password: createUserDto.password,
      firstname: createUserDto.firstname,
      lastname: createUserDto.lastname,
      role: createUserDto.role,
      enabled: createUserDto.enabled,
      createdAt: createUserDto.createdAt,
      updatedAt: Date(),
    }
    return this.usersService.update(editUser, id);
  }

  @Put('change-pass/:id')
  async resetPassword(@Param('id') id: string, @Body() createUserDto: CreateUserDto) {
    const editUser = {
      username: createUserDto.username,
      password: createUserDto.password,
      firstname: createUserDto.firstname,
      lastname: createUserDto.lastname,
      role: createUserDto.role,
      enabled: createUserDto.enabled,
      createdAt: createUserDto.createdAt,
      updatedAt: Date(),
    }
    return this.usersService.update(editUser, id);
  }
}