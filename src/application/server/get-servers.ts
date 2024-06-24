import { Inject } from '@nestjs/common';

import { ESubject, IServerRepository } from '@/domain';
import { IUseCase } from '@/shared';
import { AuthUseCase } from '../auth';
import { SERVER_REPOSITORY_TOKEN } from '@/infrastructure';
import { AUTH_USE_CASE_TOKEN } from '../token';
import { accessibleBy } from '@/infrastructure/vendors/@casl/drizzle';

interface IGetServersInputDto {}

interface IGetServersOutputDto {}

export class GetServersUseCase
  implements IUseCase<IGetServersInputDto, IGetServersOutputDto>
{
  constructor(
    @Inject(AUTH_USE_CASE_TOKEN)
    private readonly authUseCase: AuthUseCase,
    @Inject(SERVER_REPOSITORY_TOKEN)
    private readonly repository: IServerRepository,
  ) {}

  async execute(): Promise<IGetServersOutputDto> {
    const ability = await this.authUseCase.execute();

    return this.repository.getMany(
      undefined,
      accessibleBy(ability).ofType(ESubject.Server),
    );
  }
}
