import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EntryService } from './entry.service';
import { EntryController } from './entry.controller';
import { Entry, EntrySchema } from './schemas/entry.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Entry.name, schema: EntrySchema }]), // 注册 Entry 模型
  ],
  controllers: [EntryController],
  providers: [EntryService],
})
export class EntryModule {}
