import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { EntryModule } from './entry/entry.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://lby2024xd:tGVBkIdxDpKkfihq@bananotes.4arv1.mongodb.net/?retryWrites=true&w=majority&appName=Bananotes',
    ),
    UserModule,
    EntryModule,
  ],
})
export class AppModule {}
