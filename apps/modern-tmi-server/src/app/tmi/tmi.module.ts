import { Module } from '@nestjs/common';
import { TmiService } from './tmi.service';
import { TmiController } from './tmi.controller';

@Module({
  controllers: [TmiController],
  providers: [TmiService],
})
export class TmiModule {}
