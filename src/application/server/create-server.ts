import { ForbiddenException, Inject } from '@nestjs/common';

import { EAction, ESubject, IServerRepository, Server } from '@/domain';
import { IUseCase } from '@/shared';
import { SERVER_REPOSITORY_TOKEN } from '@/infrastructure';
import { AUTH_USE_CASE_TOKEN } from '../token';
import { AuthUseCase } from '../auth';

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
      throw new ForbiddenException(
        'You do not have permission to create server',
      );

    return this.repository.create({ name: input.name, ownerId: input.userId });
  }
}
