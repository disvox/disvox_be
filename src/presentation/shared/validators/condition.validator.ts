// import {
//   ValidationArguments,
//   ValidatorConstraint,
//   ValidatorConstraintInterface,
// } from 'class-validator';

// import { EStringConditionOperators, TConditionOperators } from '@/application';

// @ValidatorConstraint()
// export class ConditionValidator implements ValidatorConstraintInterface {
//   validate(
//     value: any,
//     validationArguments?: ValidationArguments | undefined,
//   ): boolean | Promise<boolean> {
//     const operators = Object.keys(value);
//     const types = Object.keys(TConditionOperators);

//     console.log(typeof operators[0] === TConditionOperators);
//     return true;
//   }

//   defaultMessage(): string {
//     return 'The provided format is invalid';
//   }
// }
