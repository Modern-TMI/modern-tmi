import { Test, TestingModule } from '@nestjs/testing';
import { TmiController } from './tmi.controller';
import { TmiService } from './tmi.service';

describe('TmiController', () => {
  let controller: TmiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TmiController],
      providers: [TmiService],
    }).compile();

    controller = module.get<TmiController>(TmiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
