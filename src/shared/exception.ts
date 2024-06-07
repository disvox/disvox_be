type TException = {
  code: string;
  message?: string;
  options?: ErrorOptions;
};

export type THttpException = TException & {
  statusCode: number;
};

export class Exception extends Error {
  code: string;

  constructor(exception: TException) {
    const { code, message, options } = exception;
    super(message, options);

    this.code = code;
  }
}

export class HttpException extends Exception {
  statusCode: number;

  constructor(exception: THttpException) {
    const { statusCode, code, message, options } = exception;
    super({ code, message, options });
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
