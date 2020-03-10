export abstract class ExtendedError<T> extends Error {
  public readonly type: T;
  public data: any;
  public code: string;

  public constructor(type: T, code: string, additionalData?: any) {
    super(code);
    this.type = type;
    this.code = code;
    this.data = additionalData;
  }
}
