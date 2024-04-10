export enum EStringConditionOperators {
  StringEquals = 'StringEquals',
  StringNotEquals = 'StringNotEquals',
  StringEqualsIgnoreCase = 'StringEqualsIgnoreCase',
  StringNotEqualsIgnoreCase = 'StringNotEqualsIgnoreCase',
  StringLike = 'StringLike',
  StringNotLike = 'StringNotLike',
}

const StringConditionOperatorValues = Object.values(EStringConditionOperators);

export enum ENumericConditionOperators {
  NumericEquals = 'NumericEquals',
  NumericNotEquals = 'NumericNotEquals',
  NumericLessThan = 'NumericLessThan',
  NumericLessThanEquals = 'NumericLessThanEquals',
  NumericGreaterThan = 'NumericGreaterThan',
  NumericGreaterThanEquals = 'NumericGreaterThanEquals',
}

const NumericConditionOperatorValues = Object.values(
  ENumericConditionOperators,
);

export enum EDateConditionOperators {
  DateEquals = 'DateEquals',
  DateNotEquals = 'DateNotEquals',
  DateLessThan = 'DateLessThan',
  DateLessThanEquals = 'DateLessThanEquals',
  DateGreaterThan = 'DateGreaterThan',
  DateGreaterThanEquals = 'DateGreaterThanEquals',
}

const DateConditionOperatorValues = Object.values(EDateConditionOperators);

export enum EBooleanConditionOperators {
  Bool = 'Bool',
}

const BooleanConditionOperatorValues = Object.values(
  EBooleanConditionOperators,
);

export type TConditionOperators =
  | `${EStringConditionOperators}`
  | `${ENumericConditionOperators}`
  | `${EDateConditionOperators}`
  | `${EBooleanConditionOperators}`;

export const ConditionOperatorValues = [
  ...StringConditionOperatorValues,
  ...NumericConditionOperatorValues,
  ...DateConditionOperatorValues,
  ...BooleanConditionOperatorValues,
];
