import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { trimString } from '../../common/utils/transformText';

export class CreateUserDto {
  @ApiProperty({ description: 'Email of the user.' })
  @IsEmail()
  @IsNotEmpty()
  @Transform(trimString)
  email: string;

  @ApiProperty({ description: 'Password of the user (must be strong).' })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
