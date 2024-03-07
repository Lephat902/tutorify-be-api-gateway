import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isEmpty,
} from 'class-validator';

export function IsDateGreaterThanToday(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isDateGreaterThanToday',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          // If the value is empty, or an invalid date, skip the validation
          if (isEmpty(value) || isNaN(new Date(value).getTime())) {
            return true;
          }
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return value >= today;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be greater than or equal to today's date.`;
        },
      },
    });
  };
}
