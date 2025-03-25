import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RunSessionModule } from './run-session/run-session.module';

@Module({
  imports: [RunSessionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
