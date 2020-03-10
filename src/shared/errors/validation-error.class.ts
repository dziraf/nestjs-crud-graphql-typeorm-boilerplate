import { ExtendedError } from './extended-error.class';

export class ValidationError extends ExtendedError<'ValidationError'> {
  public constructor(code: string, additionalData?: any) {
    super('ValidationError', code, additionalData);
  }
}
