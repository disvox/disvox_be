export class CreatedPermissionDto {
  id: string;
  action: string;
  subject: string;
  conditions: any;
  inverted: boolean;
}
