
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateTodoInput {
    title: string;
    details: string;
}

export class UpdateTodoInput {
    uuid: string;
    title?: string;
    details?: string;
}

export abstract class IMutation {
    abstract createTodo(createTodoInput: CreateTodoInput): Todo | Promise<Todo>;

    abstract updateTodo(updateTodoInput: UpdateTodoInput): Todo | Promise<Todo>;

    abstract deleteTodo(uuid: string): boolean | Promise<boolean>;
}

export abstract class IQuery {
    abstract todo(uuid: string): Todo | Promise<Todo>;

    abstract todos(): Todo[] | Promise<Todo[]>;
}

export class Todo {
    id: string;
    title: string;
    details: string;
    createdAt: string;
    updatedAt?: string;
}
