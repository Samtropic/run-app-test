import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { toLowerCase, trimString } from '../../common/utils/transformText';

export class CreateRunSessionDto {
  @ApiProperty({ description: 'Type of the run session.' })
  @IsNotEmpty()
  @Transform(trimString)
  @Transform(toLowerCase)
  runSessionType: string;

  @ApiProperty({ description: 'Start datetime of the run session.' })
  @IsDateString()
  startDateTime: string;

  @ApiProperty({
    description: 'Total runned distance (in meters) during the session.',
  })
  @IsPositive()
  @IsInt()
  distance: number;

  @ApiProperty({
    description: 'Total duration (in secondes) of the run session.',
  })
  @IsPositive()
  @IsInt()
  duration: number;

  @ApiProperty({ description: 'Note about the run session' })
  @IsOptional()
  notes: string;
}
