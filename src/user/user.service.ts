import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findUserById(userId: string): Promise<User | null> {
    return this.userModel.findOne({ userId }).exec();
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    return this.userModel
      .findOneAndUpdate({ userId }, updateUserDto, { new: true })
      .exec();
  }

  async deleteUser(
    userId: string,
  ): Promise<{ message: string; userId: string } | null> {
    const deletedUser = await this.userModel
      .findOneAndDelete({ userId })
      .exec();
    if (deletedUser) {
      return { message: 'User successfully deleted.', userId };
    }
    return null;
  }
}
