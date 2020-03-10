import { createConnection } from 'typeorm';

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { ConfigService } from '../services/config.service';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (configService: ConfigService) => {
      return await createConnection({
        name: 'default',
        ...configService.typeOrmConfig,
      } as PostgresConnectionOptions)
    },
    inject: [ConfigService],
  },
];