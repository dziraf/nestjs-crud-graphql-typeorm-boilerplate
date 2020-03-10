import { MinLength, MaxLength, IsOptional } from 'class-validator';
import { Field } from 'type-graphql';

import { UpdateTodoInput } from '../../../types/graphql';

export class UpdateTodoDto extends UpdateTodoInput {
  @Field() uuid: string;

  @Field()
  @IsOptional()
  @MinLength(3)
  @MaxLength(100)
  title?: string;
  @Field()
  @IsOptional()
  @MinLength(3)
  details?: string;
}
