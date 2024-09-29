import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://lby2024xd:tGVBkIdxDpKkfihq@bananotes.4arv1.mongodb.net/?retryWrites=true&w=majority&appName=Bananotes',
    ), // 替换为你的 MongoDB 连接字符串
    UserModule,
  ],
})
export class AppModule {}
