import { Connection } from 'typeorm';

import { Todo } from '../todo.entity';

export const todoProviders = [
  {
    // TODO: should be constant
    provide: 'TODO_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Todo),
    inject: ['DATABASE_CONNECTION'],
  },
];
