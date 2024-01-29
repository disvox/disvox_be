export interface SerializedException {
  message: string | string[];
  code: string;
  stack?: string;
  cause?: unknown;
  metadata?: unknown;
}

export abstract class BaseException extends Error {
  abstract code: string;

  constructor(
    readonly message: string,
    readonly cause?: Error,
    readonly metadata?: unknown,
  ) {
    super(message, { cause });
  }

  toJSON(): SerializedException {
    return {
      message: this.message,
      code: this.code,
      stack: this.stack,
      cause: this.cause,
      metadata: this.metadata,
    };
  }
}
