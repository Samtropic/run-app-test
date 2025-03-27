import { Module } from '@nestjs/common';
import { RunSessionsService } from './run-sessions.service';
import { RunSessionsController } from './run-sessions.controller';
import { RunSession } from './entities/run-session.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RunSession, User])],
  controllers: [RunSessionsController],
  providers: [RunSessionsService],
})
export class RunSessionsModule {}
