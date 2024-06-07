import { Inject } from '@nestjs/common';

import { EAction, ESubject, IServerRepository, Server } from '@/domain';
import { HttpException, IUseCase } from '@/shared';
import { SERVER_REPOSITORY_TOKEN } from '@/infrastructure';
import { AUTH_USE_CASE_TOKEN } from '../token';
import { AuthUseCase } from '../auth';
import { ExceptionCode } from '../exception-codes';

interface ICreateServerInputDto {
  name: string;
  userId: number;
}

interface ICreateServerOutputDto extends Server {}

export class CreateServerUseCase
  implements IUseCase<ICreateServerInputDto, ICreateServerOutputDto>
{
  constructor(
    @Inject(AUTH_USE_CASE_TOKEN)
    private readonly authUseCase: AuthUseCase,
    @Inject(SERVER_REPOSITORY_TOKEN)
    private readonly repository: IServerRepository,
  ) {}

  async execute(input: ICreateServerInputDto): Promise<ICreateServerOutputDto> {
    const ability = await this.authUseCase.execute({ userId: input.userId });

    if (ability.cannot(EAction.Create, ESubject.Server))
      throw new HttpException({
        statusCode: 403,
        code: ExceptionCode.ServerCreateForbidden,
        message: 'You cannot create server',
      });

    return this.repository.create({ name: input.name, ownerId: input.userId });
  }
}
