export class CreatedPermissionDto {
  id: string;
  action: string;
  subject: string;
  fields: string[];
  conditions: string;
  inverted: boolean;
  system: boolean;
}
