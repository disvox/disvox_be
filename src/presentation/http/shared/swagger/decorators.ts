import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import {
  BadRequestExceptionDto,
  ForbiddenExceptionDto,
  NotFoundExceptionDto,
  UnauthorizedExceptionDto,
  UnprocessableEntityExceptionDto,
} from '../dtos';
import { ESwaggerDescription } from '../swagger';

export function ApiExceptionResponse() {
  return applyDecorators(
    ApiBadRequestResponse({
      type: BadRequestExceptionDto,
      description: ESwaggerDescription.BadRequest,
    }),
    ApiUnauthorizedResponse({
      type: UnauthorizedExceptionDto,
      description: ESwaggerDescription.Unauthorized,
    }),
    ApiForbiddenResponse({
      type: ForbiddenExceptionDto,
      description: ESwaggerDescription.Forbidden,
    }),
    ApiNotFoundResponse({
      type: NotFoundExceptionDto,
      description: ESwaggerDescription.NotFound,
    }),
    ApiUnprocessableEntityResponse({
      type: UnprocessableEntityExceptionDto,
      description: ESwaggerDescription.UnprocessableEntity,
    }),
  );
}
