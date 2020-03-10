import { Module, Global, HttpModule } from '@nestjs/common';

import { databaseProviders } from './providers/database.providers';
import { ConfigService } from './services/config.service';
import { LoggerService } from './services/logger.service';

const providers = [ConfigService, LoggerService, ...databaseProviders];

@Global()
@Module({
  providers,
  imports: [HttpModule],
  exports: [...providers, HttpModule],
})
export class SharedModule {}
