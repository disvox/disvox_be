// import { IUserRepository, User } from '@/domain';
// import { IUseCase } from '@/shared';
// import { AuthzUseCase } from '../auth';

// interface IModifyUserPermissionInputDto {
//     userId: string;
//   permissionIds: string[];
// }

// interface IModifyUserPermissionOutputDto extends User {}

// export class ModifyUserPermissionUseCase
//   implements
//     IUseCase<IModifyUserPermissionInputDto, IModifyUserPermissionOutputDto>
// {
//   constructor(
//     private readonly repository: IUserRepository,
//     private authzUseCase: AuthzUseCase,
//   ) {}

//   async execute(input: IModifyUserPermissionInputDto): Promise<User> {
//     const user = this.authzUseCase.getInfo({userId: });
//   }
// }
