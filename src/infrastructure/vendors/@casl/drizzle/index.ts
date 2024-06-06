import { AnyMongoAbility, MongoAbility, SubjectType } from '@casl/ability';
import {
  AccessibleRecords as MongooseAccessibleRecords,
  accessibleBy as mongooseAccessibleBy,
} from '@casl/mongoose';

import { MongoToSQLTranslator } from '../../mongo2sql';

function convertToSqlWhereClause(mongoQuery: Record<string, unknown>) {
  return MongoToSQLTranslator.buildSQL(
    MongoToSQLTranslator.translateQuery(mongoQuery),
  );
}

export class AccessibleRecords<T extends SubjectType> {
  constructor(
    private readonly mongooseAccessibleRecord: MongooseAccessibleRecords<T>,
  ) {}

  ofType(subjectType: T): string {
    return convertToSqlWhereClause(
      this.mongooseAccessibleRecord.ofType(subjectType),
    );
  }
}

export function accessibleBy<T extends AnyMongoAbility>(
  ability: MongoAbility,
  action: Parameters<T['rulesFor']>[0] = 'read',
) {
  return new AccessibleRecords(mongooseAccessibleBy(ability, action));
}
