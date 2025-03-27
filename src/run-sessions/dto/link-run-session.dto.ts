import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LinkRunSessionDto {
  @ApiProperty({ description: 'ID of the User to link the RunSession to' })
  @IsNumber()
  userId: number;
}
