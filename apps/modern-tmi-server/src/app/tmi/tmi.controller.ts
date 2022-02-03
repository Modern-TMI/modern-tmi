import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TmiService } from './tmi.service';
import { CreateTmiDto } from './dto/create-tmi.dto';
import { UpdateTmiDto } from './dto/update-tmi.dto';

@Controller('tmi')
export class TmiController {
  constructor(private readonly tmiService: TmiService) {}

  @Post()
  create(@Body() createTmiDto: CreateTmiDto) {
    return this.tmiService.create(createTmiDto);
  }

  @Get()
  findAll() {
    return this.tmiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tmiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTmiDto: UpdateTmiDto) {
    return this.tmiService.update(+id, updateTmiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tmiService.remove(+id);
  }
}
