export class CreatedPermissionDto {
  id: number;
  action: string;
  subject: string;
  conditions: any;
  inverted: boolean;
}
