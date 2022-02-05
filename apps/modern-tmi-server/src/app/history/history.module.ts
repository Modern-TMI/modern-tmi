import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryRepository } from './repositories/history.repository';

@Module({
  imports: [TypeOrmModule.forFeature([HistoryRepository])],
  exports: [HistoryService, TypeOrmModule],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
