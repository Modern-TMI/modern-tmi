import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { setDbConfig } from '../environments/db.config';
import { AuthModule } from './auth/auth.module';
import { FavoriteModule } from './favorite/favorite.module';
import { HistoryModule } from './history/history.module';
import { CommentModule } from './comment/comment.module';
import { TagsModule } from './tags/tags.module';
import { TmiModule } from './tmi/tmi.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(setDbConfig('dev')),
    UsersModule,
    AuthModule,
    TmiModule,
    TagsModule,
    CommentModule,
    HistoryModule,
    FavoriteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
