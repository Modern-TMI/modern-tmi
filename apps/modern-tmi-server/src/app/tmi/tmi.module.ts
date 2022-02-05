import { Module } from '@nestjs/common';
import { TmiService } from './tmi.service';
import { TmiController } from './tmi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TmiRepository } from './repositories/tmi.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TmiRepository])],
  exports: [TmiService, TypeOrmModule],
  controllers: [TmiController],
  providers: [TmiService],
})
export class TmiModule {}
