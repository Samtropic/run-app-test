import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RunSessionsModule } from './run-sessions/run-sessions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfig } from './config/postgres.config';
import * as Joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IamModule } from './iam/iam.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${path.join(__dirname, '..', '.env')}`,
      validationSchema: Joi.object({
        DB_HOST: Joi.required(),
        DB_PORT: Joi.number().default(5432),
        DB_USER: Joi.string().required(),
        DB_PASS: Joi.string().required(),
        DB_DBNAME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfig,
      inject: [PostgresConfig],
    }),
    RunSessionsModule,
    UsersModule,
    IamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    const conf = new PostgresConfig(new ConfigService());
    console.log(conf.createTypeOrmOptions().entities);
  }
}
