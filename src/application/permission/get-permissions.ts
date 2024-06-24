import { Inject } from '@nestjs/common';
import { accessibleBy } from '@/infrastructure/vendors/@casl/drizzle';

import { EAction, ESubject, IPermissionRepository } from '@/domain';
import { IUseCase } from '@/shared';
import { PERMISSION_REPOSITORY_TOKEN } from '@/infrastructure';
import { AuthUseCase } from '../auth';
import { AUTH_USE_CASE_TOKEN } from '../token';

export interface IGetPermissionsInputDto {}

export interface IGetPermissionsOutputDto {
  id: number;
  action: EAction;
  subject: ESubject;
  conditions: Record<string, any>;
  inverted: boolean;
}

export class GetPermissionsUseCase
  implements IUseCase<IGetPermissionsInputDto, IGetPermissionsOutputDto[]>
{
  constructor(
    @Inject(AUTH_USE_CASE_TOKEN)
    private readonly authUseCase: AuthUseCase,
    @Inject(PERMISSION_REPOSITORY_TOKEN)
    private readonly repository: IPermissionRepository,
  ) {}

  async execute(): Promise<IGetPermissionsOutputDto[]> {
    const ability = await this.authUseCase.execute();

    return this.repository.getMany(
      undefined,
      accessibleBy(ability).ofType(ESubject.Permission),
    );
  }
}
