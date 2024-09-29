import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EntryService } from './entry.service';
import {
  LikeEntryDto,
  DislikeEntryDto,
  InvisibleEntryDto,
  VisibleEntryDto,
} from './dto/entry.dto';

@Controller('entry')
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  @Post('like')
  async likeEntry(@Body() likeEntryDto: LikeEntryDto) {
    return this.entryService.likeEntry(likeEntryDto);
  }

  @Post('unlike')
  async unlikeEntry(@Body() likeEntryDto: LikeEntryDto) {
    return this.entryService.unlikeEntry(likeEntryDto);
  }

  @Post('dislike')
  async dislikeEntry(@Body() dislikeEntryDto: DislikeEntryDto) {
    return this.entryService.dislikeEntry(dislikeEntryDto);
  }

  @Post('undislike')
  async undislikeEntry(@Body() dislikeEntryDto: DislikeEntryDto) {
    return this.entryService.undislikeEntry(dislikeEntryDto);
  }

  @Post('invisible')
  async invisibleEntry(@Body() invisibleEntryDto: InvisibleEntryDto) {
    await this.entryService.invisibleEntry(invisibleEntryDto);
    return { message: 'Entry has been marked as invisible for the user.' };
  }

  @Post('visible')
  async visibleEntry(@Body() visibleEntryDto: VisibleEntryDto) {
    await this.entryService.visibleEntry(visibleEntryDto);
    return { message: 'Entry has been marked as visible for the user.' };
  }
}
