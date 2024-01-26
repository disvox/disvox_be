export class CreatedPermissionDto {
  id: string;
  action: string;
  subject: string;
  fields: string[];
  conditions: any;
  inverted: boolean;
  system: boolean;
}
