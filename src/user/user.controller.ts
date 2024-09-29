import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findUserById(
      createUserDto.userId,
    );
    if (existingUser) {
      throw new HttpException('User ID already exists', HttpStatus.BAD_REQUEST);
    }
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async getUser(@Query('userId') userId: string) {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Put(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return this.userService.updateUser(userId, updateUserDto);
  }

  @Delete()
  async deleteUser(@Query('userId') userId: string) {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return this.userService.deleteUser(userId);
  }
}
