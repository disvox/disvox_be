import { IPermissionRepository, Permission } from '@/domain';
import { IUseCase } from '@/shared';
import { TConditionOperators } from './enums';

interface ICreatePermissionDto {
  action: string;
  subject: string;
  conditions: {
    [key in TConditionOperators]?: Record<string, string>;
  };
  inverted: boolean;
}

interface ICreatedPermissionDto {
  id: string;
  action: string;
  subject: string;
  conditions: string;
  inverted: boolean;
}

export class CreatePermissionUseCase
  implements IUseCase<ICreatePermissionDto, ICreatedPermissionDto>
{
  constructor(private readonly repository: IPermissionRepository) {}

  public async execute(
    input: ICreatePermissionDto,
  ): Promise<ICreatedPermissionDto> {
    const permission = new Permission();

    permission.action = input.action;
    permission.subject = input.subject;
    permission.conditions = JSON.stringify(input.conditions);
    permission.inverted = input.inverted;

    return this.repository.create(permission);
  }
}
