import { Module } from '@nestjs/common';
import { RunSessionsService } from './run-sessions.service';
import { RunSessionsController } from './run-sessions.controller';

@Module({
  controllers: [RunSessionsController],
  providers: [RunSessionsService],
})
export class RunSessionsModule {}
