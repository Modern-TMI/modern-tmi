import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './module/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { setDbConfig } from '../environments/db.config';
import { AuthModule } from './authentication/auth.module';
import { FavoriteModule } from './module/favorite/favorite.module';
import { HistoryModule } from './module/history/history.module';
import { CommentModule } from './module/comments/comment.module';
import { TagsModule } from './module/tags/tags.module';
import { TmiModule } from './module/tmi/tmi.module';

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
