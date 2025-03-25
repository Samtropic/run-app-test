import { PartialType } from '@nestjs/mapped-types';
import { CreateRunSessionDto } from './create-run-session.dto';

export class UpdateRunSessionDto extends PartialType(CreateRunSessionDto) {}
