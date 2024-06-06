import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { ConditionOperatorValues } from '@/application';
import { ArgumentInvalidException } from '../exceptions';

@ValidatorConstraint()
export class ConditionValidator implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments: ValidationArguments,
  ): boolean | Promise<boolean> {
    const { property } = validationArguments;

    const operators = Object.keys(value) as any[];
    if (
      operators.some((operator) => !ConditionOperatorValues.includes(operator))
    )
      throw new ArgumentInvalidException(
        `key of ${property} must be one of the following values: ${ConditionOperatorValues.join(
          ', ',
        )}`,
      );

    const values = Object.values(value) as any[];
    if (
      values.some((value) => {
        if (typeof value !== 'object') return true;
        const nestedKeys = Object.keys(value);
        const nestedValues = Object.values(value);

        return (
          nestedKeys.some((key) => typeof key !== 'string') ||
          nestedValues.some((value) => {
            if (Array.isArray(value)) {
              return value.some((element) => typeof element !== 'string');
            } else return typeof value !== 'string';
          })
        );
      })
    )
      throw new ArgumentInvalidException(
        `value of ${property} is invalid (nested value must be string or array of string)`,
      );

    return true;
  }
}
