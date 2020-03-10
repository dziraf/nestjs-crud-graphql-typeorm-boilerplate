import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  NestExpressApplication,
  ExpressAdapter,
} from '@nestjs/platform-express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ConfigService } from './shared/services/config.service';
import { LoggerService } from './shared/services/logger.service';
import { SharedModule } from './shared/shared.module';

async function bootstrap() {
  initializeTransactionalContext();
  patchTypeORMRepositoryWithBaseRepository();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true },
  );
  const loggerService = app.select(SharedModule).get(LoggerService);
  app.useLogger(loggerService);
  app.use(helmet());
  app.use(
    morgan('combined', {
      stream: {
        write: message => {
          loggerService.log(message);
        },
      },
    }),
  );
  const reflector = app.get(Reflector);

  app.useGlobalFilters(new HttpExceptionFilter(reflector, loggerService));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      transform: true,
      validationError: {
          target: false,
      },
  }));

  const configService = app.select(SharedModule).get(ConfigService);

  const port = configService.getNumber('PORT') || 3000;
  const host = configService.get('HOST') || '127.0.0.1';

  await app.listen(port, host);

  loggerService.info(`Server running on ${host}:${port}`);
}
bootstrap();
