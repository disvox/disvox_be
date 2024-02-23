import { Injectable } from '@nestjs/common';
import { AbilityBuilder, InferSubjects, PureAbility } from '@casl/ability';
import { accessibleBy, createPrismaAbility } from '@casl/prisma';

import { Permission, User } from '@/domain';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type Subjects = InferSubjects<typeof User> | 'all';

export type AppAbility = PureAbility<[Action, Subjects], never>;

@Injectable()
export class AbilityFactory {
  defineAbility(permission: Permission) {
    AbilityBuilder(createPrismaAbility);
  }

  checkAbility(ability: AppAbility) {
    return accessibleBy(ability);
  }
}
