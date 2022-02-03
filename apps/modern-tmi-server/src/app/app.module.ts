import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { setDbConfig } from '../environments/db.config';
import { AuthModule } from './auth/auth.module';
import { TmiModule } from './tmi/tmi.module';
import { CommentsModule } from './comments/comments.module';
import { TagsModule } from './tags/tags.module';
import { TmiModule } from './tmi/tmi.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(setDbConfig('dev')),
    UsersModule,
    AuthModule,
    TmiModule,
    TagsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
