import { MinLength, MaxLength } from 'class-validator';

import { CreateTodoInput } from '../../../types/graphql';

export class CreateTodoDto extends CreateTodoInput {
  @MinLength(3)
  @MaxLength(100)
  title: string;
  @MinLength(3)
  details: string;
}
