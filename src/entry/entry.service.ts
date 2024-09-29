import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  CreateEntryDto,
  UpdateEntryDto,
  LikeEntryDto,
  DislikeEntryDto,
  InvisibleEntryDto,
  VisibleEntryDto,
} from './dto/entry.dto';
import { Entry, EntryDocument } from './schemas/entry.schema';

@Injectable()
export class EntryService {
  constructor(
    @InjectModel(Entry.name) private entryModel: Model<EntryDocument>,
  ) {}

  async createEntry(createEntryDto: CreateEntryDto): Promise<Entry> {
    const createdEntry = new this.entryModel(createEntryDto);
    return createdEntry.save();
  }

  async findEntryById(entryId: string): Promise<Entry | null> {
    if (!Types.ObjectId.isValid(entryId)) {
      throw new HttpException(
        'Invalid entry ID format.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.entryModel.findById(entryId).exec();
  }

  async findAllEntries(): Promise<Entry[]> {
    return this.entryModel.find({ isDeleted: false }).exec(); // 查询所有未删除的条目
  }

  async findEntriesByAuthorOrUrl(
    author?: string,
    url?: string,
  ): Promise<Entry[]> {
    const query: any = {};
    if (author) query.author = author;
    if (url) query.url = url;
    query.isDeleted = false; // 只查询未删除的条目
    return this.entryModel.find(query).exec();
  }

  async updateEntry(
    entryId: string,
    updateEntryDto: UpdateEntryDto,
  ): Promise<Entry | null> {
    if (!Types.ObjectId.isValid(entryId)) {
      throw new HttpException(
        'Invalid entry ID format.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.entryModel
      .findByIdAndUpdate(entryId, updateEntryDto, { new: true })
      .exec();
  }

  async deleteEntry(
    entryId: string,
  ): Promise<{ message: string; id: string; isDeleted: boolean } | null> {
    if (!Types.ObjectId.isValid(entryId)) {
      throw new HttpException(
        'Invalid entry ID format.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const deletedEntry = await this.entryModel
      .findByIdAndUpdate(entryId, { isDeleted: true }, { new: true })
      .exec();
    if (deletedEntry) {
      return {
        message: 'Entry successfully deleted.',
        id: deletedEntry._id.toString(),
        isDeleted: deletedEntry.isDeleted,
      };
    }
    return null;
  }

  // 点赞条目
  async likeEntry(likeEntryDto: LikeEntryDto): Promise<{ likes: number }> {
    if (!Types.ObjectId.isValid(likeEntryDto.entryId)) {
      throw new HttpException(
        'Invalid entry ID format.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const entry = await this.entryModel.findById(likeEntryDto.entryId).exec();
    if (!entry) {
      throw new HttpException('Entry not found.', HttpStatus.NOT_FOUND);
    }

    // 检查用户是否已经点赞
    if (entry.likes.includes(likeEntryDto.userId)) {
      throw new HttpException(
        'User has already liked this entry.',
        HttpStatus.FORBIDDEN,
      );
    }

    // 如果用户之前点过踩，先移除
    entry.dislikes = entry.dislikes.filter(
      (userId) => userId !== likeEntryDto.userId,
    );
    entry.likes.push(likeEntryDto.userId);

    await entry.save();
    return { likes: entry.likes.length };
  }

  // 取消点赞条目
  async unlikeEntry(likeEntryDto: LikeEntryDto): Promise<{ likes: number }> {
    if (!Types.ObjectId.isValid(likeEntryDto.entryId)) {
      throw new HttpException(
        'Invalid entry ID format.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const entry = await this.entryModel.findById(likeEntryDto.entryId).exec();
    if (!entry) {
      throw new HttpException('Entry not found.', HttpStatus.NOT_FOUND);
    }

    // 检查用户是否已经点赞
    if (!entry.likes.includes(likeEntryDto.userId)) {
      throw new HttpException(
        'User has not liked this entry.',
        HttpStatus.FORBIDDEN,
      );
    }

    // 移除点赞
    entry.likes = entry.likes.filter(
      (userId) => userId !== likeEntryDto.userId,
    );
    await entry.save();
    return { likes: entry.likes.length };
  }

  // 点踩条目
  async dislikeEntry(
    dislikeEntryDto: DislikeEntryDto,
  ): Promise<{ dislikes: number }> {
    if (!Types.ObjectId.isValid(dislikeEntryDto.entryId)) {
      throw new HttpException(
        'Invalid entry ID format.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const entry = await this.entryModel
      .findById(dislikeEntryDto.entryId)
      .exec();
    if (!entry) {
      throw new HttpException('Entry not found.', HttpStatus.NOT_FOUND);
    }

    // 检查用户是否已经点踩
    if (entry.dislikes.includes(dislikeEntryDto.userId)) {
      throw new HttpException(
        'User has already disliked this entry.',
        HttpStatus.FORBIDDEN,
      );
    }

    // 如果用户之前点过赞，先移除
    entry.likes = entry.likes.filter(
      (userId) => userId !== dislikeEntryDto.userId,
    );
    entry.dislikes.push(dislikeEntryDto.userId);

    await entry.save();
    return { dislikes: entry.dislikes.length };
  }

  // 取消点踩条目
  async undislikeEntry(
    dislikeEntryDto: DislikeEntryDto,
  ): Promise<{ dislikes: number }> {
    if (!Types.ObjectId.isValid(dislikeEntryDto.entryId)) {
      throw new HttpException(
        'Invalid entry ID format.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const entry = await this.entryModel
      .findById(dislikeEntryDto.entryId)
      .exec();
    if (!entry) {
      throw new HttpException('Entry not found.', HttpStatus.NOT_FOUND);
    }

    // 检查用户是否已经点踩
    if (!entry.dislikes.includes(dislikeEntryDto.userId)) {
      throw new HttpException(
        'User has not disliked this entry.',
        HttpStatus.FORBIDDEN,
      );
    }

    // 移除点踩
    entry.dislikes = entry.dislikes.filter(
      (userId) => userId !== dislikeEntryDto.userId,
    );
    await entry.save();
    return { dislikes: entry.dislikes.length };
  }

  // 隐藏条目
  async invisibleEntry(invisibleEntryDto: InvisibleEntryDto): Promise<void> {
    if (!Types.ObjectId.isValid(invisibleEntryDto.entryId)) {
      throw new HttpException(
        'Invalid entry ID format.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const entry = await this.entryModel
      .findById(invisibleEntryDto.entryId)
      .exec();
    if (!entry) {
      throw new HttpException('Entry not found.', HttpStatus.NOT_FOUND);
    }

    // 检查用户是否已经将条目隐藏
    if (entry.invisibleEntries.includes(invisibleEntryDto.userId)) {
      throw new HttpException(
        'Entry is already invisible for this user.',
        HttpStatus.FORBIDDEN,
      );
    }

    // 添加用户到 invisibleEntries 列表
    entry.invisibleEntries.push(invisibleEntryDto.userId);
    await entry.save();
  }

  // 显示条目
  async visibleEntry(visibleEntryDto: VisibleEntryDto): Promise<void> {
    if (!Types.ObjectId.isValid(visibleEntryDto.entryId)) {
      throw new HttpException(
        'Invalid entry ID format.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const entry = await this.entryModel
      .findById(visibleEntryDto.entryId)
      .exec();
    if (!entry) {
      throw new HttpException('Entry not found.', HttpStatus.NOT_FOUND);
    }

    // 检查用户是否将条目隐藏
    if (!entry.invisibleEntries.includes(visibleEntryDto.userId)) {
      throw new HttpException(
        'Entry is not invisible for this user.',
        HttpStatus.FORBIDDEN,
      );
    }

    // 从 invisibleEntries 列表中移除用户
    entry.invisibleEntries = entry.invisibleEntries.filter(
      (userId) => userId !== visibleEntryDto.userId,
    );
    await entry.save();
  }
}
