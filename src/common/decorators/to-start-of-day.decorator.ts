import { Transform, TransformFnParams } from 'class-transformer';
import { isString } from 'class-validator';

export function ToStartOfDay(): (target: any, key: string) => void {
  return Transform((params: TransformFnParams) => {
    const { value } = params;
    let date: Date = value;
    if (isString(value)) {
      date = new Date(date);
    }
    date.setHours(0, 0, 0, 0);
    return date;
  });
}
