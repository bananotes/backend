import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Entry } from './entry.schema';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';

@Injectable()
export class EntryService {
  constructor(@InjectModel(Entry.name) private entryModel: Model<Entry>) {}

  private validateId(id: string): string {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid entry ID');
    }
    return id;
  }

  async create(createEntryDto: CreateEntryDto): Promise<Entry> {
    const createdEntry = new this.entryModel(createEntryDto);
    return createdEntry.save();
  }

  async findAll(query: any): Promise<Entry[]> {
    return this.entryModel.find({ ...query, isDeleted: false }).exec();
  }

  async findOne(id: string): Promise<string> {
    const validId = this.validateId(id);
    const entry = await this.entryModel
      .findOne({ _id: validId, isDeleted: false })
      .exec();
    if (!entry) {
      throw new NotFoundException(`Entry with ID "${id}" not found`);
    }
    return entry._id.toString();
  }

  async update(id: string, updateEntryDto: UpdateEntryDto): Promise<Entry> {
    const validId = this.validateId(id);
    const updatedEntry = await this.entryModel
      .findOneAndUpdate(
        { _id: validId, isDeleted: false },
        { ...updateEntryDto, updateTime: new Date() },
        { new: true },
      )
      .exec();
    if (!updatedEntry) {
      throw new NotFoundException(`Entry with ID "${id}" not found`);
    }
    return updatedEntry;
  }

  async delete(id: string): Promise<Entry> {
    const validId = this.validateId(id);
    const deletedEntry = await this.entryModel
      .findOneAndUpdate(
        { _id: validId, isDeleted: false },
        { isDeleted: true, updateTime: new Date() },
        { new: true },
      )
      .exec();
    if (!deletedEntry) {
      throw new NotFoundException(`Entry with ID "${id}" not found`);
    }
    return deletedEntry;
  }

  async like(id: string): Promise<Entry> {
    const validId = this.validateId(id);
    const likedEntry = await this.entryModel
      .findOneAndUpdate(
        { _id: validId, isDeleted: false },
        { $inc: { likes: 1 }, updateTime: new Date() },
        { new: true },
      )
      .exec();
    if (!likedEntry) {
      throw new NotFoundException(`Entry with ID "${id}" not found`);
    }
    return likedEntry;
  }

  async unlike(id: string): Promise<Entry> {
    const validId = this.validateId(id);
    const unlikedEntry = await this.entryModel
      .findOneAndUpdate(
        { _id: validId, isDeleted: false, likes: { $gt: 0 } },
        { $inc: { likes: -1 }, updateTime: new Date() },
        { new: true },
      )
      .exec();
    if (!unlikedEntry) {
      throw new NotFoundException(
        `Entry with ID "${id}" not found or likes already at 0`,
      );
    }
    return unlikedEntry;
  }

  async dislike(id: string): Promise<Entry> {
    const validId = this.validateId(id);
    const dislikedEntry = await this.entryModel
      .findOneAndUpdate(
        { _id: validId, isDeleted: false },
        { $inc: { dislikes: 1 }, updateTime: new Date() },
        { new: true },
      )
      .exec();
    if (!dislikedEntry) {
      throw new NotFoundException(`Entry with ID "${id}" not found`);
    }
    return dislikedEntry;
  }

  async undislike(id: string): Promise<Entry> {
    const validId = this.validateId(id);
    const undislikedEntry = await this.entryModel
      .findOneAndUpdate(
        { _id: validId, isDeleted: false, dislikes: { $gt: 0 } },
        { $inc: { dislikes: -1 }, updateTime: new Date() },
        { new: true },
      )
      .exec();
    if (!undislikedEntry) {
      throw new NotFoundException(
        `Entry with ID "${id}" not found or dislikes already at 0`,
      );
    }
    return undislikedEntry;
  }

  async makeInvisible(entryId: string): Promise<{ message: string }> {
    // TODO: Implement actual invisibility logic
    return { message: 'TODO: Implement invisibility feature' };
  }

  async makeVisible(entryId: string): Promise<{ message: string }> {
    // TODO: Implement actual visibility logic
    return { message: 'TODO: Implement visibility feature' };
  }
}
