import { Module } from '@nestjs/common';

import { TodosResolver } from './graphql/todos.resolver';
import { todoProviders } from './repositories/todo.providers';
import { TodosService } from './todos.service';

@Module({
  providers: [...todoProviders, TodosResolver, TodosService],
})
export class TodosModule {}