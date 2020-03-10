import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

export class ConfigService {
  constructor() {
    dotenv.config({
      path: `.env`,
    });

    for (const envName of Object.keys(process.env)) {
      process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
    }
    if (this.nodeEnv === 'development') {
      console.info(process.env);
    }
  }

  public get(key: string): string {
    return process.env[key];
  }

  public getNumber(key: string): number {
    return Number(this.get(key));
  }

  get nodeEnv(): string {
    return this.get('NODE_ENV') || 'development';
  }

  get typeOrmConfig(): TypeOrmModuleOptions {
    const entities = [__dirname + '/../../modules/**/*.entity{.ts,.js}'];
    const migrations = [__dirname + '/../../migrations/*{.ts,.js}'];

    return {
      entities,
      migrations,
      keepConnectionAlive: true,
      type: 'postgres',
      host: this.get('POSTGRES_HOST') || 'localhost',
      port: this.getNumber('POSTGRES_PORT') || 7023,
      username: this.get('POSTGRES_USERNAME') || 'db_user',
      password: this.get('POSTGRES_PASSWORD') || '',
      database: this.get('POSTGRES_DATABASE') || 'db_dev',
      cli: { migrationsDir: './src/migrations' },
      migrationsTransactionMode: 'each',
      logging: this.nodeEnv === 'development',
      synchronize: this.nodeEnv === 'development',
    };
  }

  get winstonConfig(): winston.LoggerOptions {
    return {
      transports: [
        new DailyRotateFile({
          level: 'debug',
          filename: `./logs/${this.nodeEnv}/debug-%DATE%.log`,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
        new DailyRotateFile({
          level: 'error',
          filename: `./logs/${this.nodeEnv}/error-%DATE%.log`,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false,
          maxSize: '20m',
          maxFiles: '30d',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
        new winston.transports.Console({
          level: 'debug',
          handleExceptions: true,
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
            winston.format.simple(),
          ),
        }),
      ],
      exitOnError: false,
    };
  }
}
