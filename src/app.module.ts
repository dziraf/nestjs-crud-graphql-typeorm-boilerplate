import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TerminusModule} from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './modules/todos/todos.module';
import { ConfigService } from './shared/services/config.service';
import { TerminusOptionsService } from './shared/services/terminus-options.service';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    TodosModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      // TODO: config based on env
      playground: true,
      include: [TodosModule],
      definitions: {
        path: join(process.cwd(), 'src/types/graphql.ts'),
        outputAs: 'class',
      },
    }),
    TerminusModule.forRootAsync({
      useClass: TerminusOptionsService,
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ConfigService) => configService.typeOrmConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
