import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteRepository } from './favorite.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteRepository])],
  exports: [FavoriteService, TypeOrmModule],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
