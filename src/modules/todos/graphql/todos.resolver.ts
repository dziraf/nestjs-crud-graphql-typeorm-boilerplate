import { Resolver, Query, Args, Mutation, ResolveProperty } from '@nestjs/graphql';

// TODO: Add aliases
import { CreateTodoDto } from '../dtos/create-todo.dto';
import { UpdateTodoDto } from '../dtos/update-todo.dto';
import { Todo as TodoEntity } from '../todo.entity';
import { TodosService } from '../todos.service';

@Resolver('Todo')
export class TodosResolver {
  constructor(
    private readonly todosService: TodosService,
  ) {}

  // TODO: Better typings in decorators
  @ResolveProperty('id')
  id(todo: TodoEntity) {
    return todo.uuid;
  }

  @ResolveProperty('createdAt')
  createdAt(todo: TodoEntity) {
    return todo.createdAt.toUTCString();
  }

  @ResolveProperty('updatedAt')
  updatedAt(todo: TodoEntity) {
    return todo.updatedAt?.toUTCString();
  }

  @Query()
  async todos(): Promise<TodoEntity[]> {
    return this.todosService.findAll();
  }

  @Query()
  async todo(@Args('uuid') uuid: string): Promise<TodoEntity> {
    return this.todosService.findOne(uuid);
  }

  @Mutation()
  async createTodo(@Args('createTodoInput') createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const uuid = await this.todosService.create(createTodoDto);

    return this.todosService.findOne(uuid);
  }

  @Mutation()
  async deleteTodo(@Args('uuid') uuid: string): Promise<boolean> {
    await this.todosService.delete(uuid);

    return true;
  }

  // TODO: find out why uuid is always missing in updateTodoDto
  @Mutation()
  async updateTodo(
    @Args('updateTodoInput') updateTodoDto: UpdateTodoDto,
  ): Promise<TodoEntity> {
    console.log(updateTodoDto);
    await this.todosService.update(updateTodoDto);

    return this.todosService.findOne(updateTodoDto.uuid);
  }
}
