import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { uuid as uuidv4 } from 'uuidv4';

import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { TodoErrors } from './errors';
import { Todo } from './todo.entity';


@Injectable()
export class TodosService {
  constructor(@Inject('TODO_REPOSITORY') private readonly todoRepository: Repository<Todo>) {}

  @Transactional()
  async create(todoDto: CreateTodoDto): Promise<string> {
    const uuid = uuidv4();
    await this.todoRepository.insert({ uuid, ...todoDto });

    return uuid;
  }

  @Transactional()
  async update(todoDto: UpdateTodoDto): Promise<void> {
    const { uuid, ...data } = todoDto;

    const todo = await this.todoRepository.findOne({ uuid });

    console.log(todo);
    if (!todo) {
      throw TodoErrors.TodoUpdateMissingTodo(uuid);
    }

    // TODO: find a way to return updated entity without querying again
    await this.todoRepository.update({ uuid }, { ...data, updatedAt: new Date(new Date().toUTCString()) });
  }

  @Transactional()
  async delete(uuid: string): Promise<void> {
    await this.todoRepository.delete({ uuid });
  }

  findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  findOne(uuid: string): Promise<Todo> {
    return this.todoRepository.findOne({ uuid });
  }
}