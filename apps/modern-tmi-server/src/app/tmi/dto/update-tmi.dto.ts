import { PartialType } from '@nestjs/swagger';
import { CreateTmiDto } from './create-tmi.dto';

export class UpdateTmiDto extends PartialType(CreateTmiDto) {}
