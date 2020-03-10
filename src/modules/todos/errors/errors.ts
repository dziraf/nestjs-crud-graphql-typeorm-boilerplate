import { ValidationError } from '../../../shared/errors/validation-error.class';

const errors = {
  TodoUpdateMissingTodo: function (uuid: string) {
    return new ValidationError('TodoUpdateMissingTodo', { uuid });
  }
}

export default errors;
