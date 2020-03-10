import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Todo } from 'src/types/graphql';

export class TodoDto extends Todo {
  @IsString()
  readonly id!: string;

  @IsString()
  @IsNotEmpty()
  readonly title!: string;

  @IsString()
  @IsNotEmpty()
  readonly details!: string;

  @IsString()
  @IsNotEmpty()
  readonly createdAt!: string;

  @IsOptional()
  @IsString()
  readonly updatedAt?: string;
}
