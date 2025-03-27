import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IamModule } from 'src/iam/iam.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), IamModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
