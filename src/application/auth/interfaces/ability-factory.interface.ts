import { Permission } from '@/domain';

export interface IAbility {
  can(...args: any): boolean;
  cannot(...args: any): boolean;
}

export interface IAbilityFactory {
  defineAbility(permissions: Permission[]): IAbility;
}
