import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { EntryService } from './entry.service';

@Controller('entry')
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  @Post()
  create(@Body() createEntryDto: any) {
    return this.entryService.create(createEntryDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.entryService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entryService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEntryDto: any) {
    return this.entryService.update(id, updateEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entryService.delete(id);
  }

  @Post('like')
  like(@Body('entryId') entryId: string) {
    return this.entryService.like(entryId);
  }

  @Post('unlike')
  unlike(@Body('entryId') entryId: string) {
    return this.entryService.unlike(entryId);
  }

  @Post('dislike')
  dislike(@Body('entryId') entryId: string) {
    return this.entryService.dislike(entryId);
  }

  @Post('undislike')
  undislike(@Body('entryId') entryId: string) {
    return this.entryService.undislike(entryId);
  }

  // TODO: Implement invisibility feature
  @Post('invisible')
  @HttpCode(HttpStatus.OK)
  async makeInvisible(@Body('entryId') entryId: string) {
    return this.entryService.makeInvisible(entryId);
  }

  @Post('visible')
  @HttpCode(HttpStatus.OK)
  async makeVisible(@Body('entryId') entryId: string) {
    return this.entryService.makeVisible(entryId);
  }
}
