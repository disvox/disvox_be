import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class BadRequestExceptionDto {
  @ApiProperty({ example: 400 })
  status: number;

  @ApiProperty({ example: HttpStatus[400] })
  error: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  message: string;
}

export class UnauthorizedExceptionDto {
  @ApiProperty({ example: 401 })
  status: number;

  @ApiProperty({ example: HttpStatus[401] })
  error: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  message: string;
}

export class ForbiddenExceptionDto {
  @ApiProperty({ example: 403 })
  status: number;

  @ApiProperty({ example: HttpStatus[403] })
  error: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  message: string;
}

export class NotFoundExceptionDto {
  @ApiProperty({ example: 404 })
  status: number;

  @ApiProperty({ example: HttpStatus[404] })
  error: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  message: string;
}

export class UnprocessableEntityExceptionDto {
  @ApiProperty({ example: 422 })
  status: number;

  @ApiProperty({ example: HttpStatus[422] })
  error: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  message: string;
}
