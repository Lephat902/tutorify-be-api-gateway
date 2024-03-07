import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isEmpty,
} from 'class-validator';

export function IsDateWithinNDaysFromToday(
  days: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isDateWithinNDaysFromToday',
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
          const endDate = new Date(value);
          endDate.setHours(0, 0, 0, 0);
          const diffInTime = endDate.getTime() - today.getTime();
          const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
          return diffInDays <= days;
        },
        defaultMessage(args: ValidationArguments) {
          return `The ${args.property} must be within ${days} days from today.`;
        },
      },
    });
  };
}
