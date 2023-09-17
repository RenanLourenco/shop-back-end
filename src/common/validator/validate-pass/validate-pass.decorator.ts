import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'PassValidate', async: false })
export class PassValidate implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const regexpValidatePass = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~])(?=.*[0-9])(?=.*[A-Z]).+$/
    return regexpValidatePass.test(text)
  }

  defaultMessage(args: ValidationArguments) {
    return 'Password invalid.';
  }
}