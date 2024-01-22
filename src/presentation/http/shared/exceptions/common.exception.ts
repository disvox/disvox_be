import { BaseException } from './base.exception';
import {
  ARGUMENT_INVALID,
  ARGUMENT_NOT_PROVIDED,
  ARGUMENT_OUT_OF_RANGE,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from './exception-codes';

export class ArgumentInvalidException extends BaseException {
  readonly code = ARGUMENT_INVALID;
}

export class ArgumentNotProvidedException extends BaseException {
  readonly code = ARGUMENT_NOT_PROVIDED;
}

export class ArgumentOutOfRangeException extends BaseException {
  readonly code = ARGUMENT_OUT_OF_RANGE;
}

export class ConflictException extends BaseException {
  readonly code = CONFLICT;
}

export class NotFoundException extends BaseException {
  readonly code = NOT_FOUND;
}

export class InternalServerErrorException extends BaseException {
  static readonly message = 'Internal server error';

  constructor(message = InternalServerErrorException.message) {
    super(message);
  }

  readonly code = INTERNAL_SERVER_ERROR;
}
