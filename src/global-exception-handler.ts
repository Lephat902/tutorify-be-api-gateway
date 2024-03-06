import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      console.log('HTTP EXCEPTION', exception);
      response.status(exception.getStatus()).json(exception.getResponse());
      return;
    }

    if (exception.error?.statusCode !== undefined) {
      response.status(exception.error.statusCode).json(exception.error.message);
      console.log('CAN BE CATEGORIZED AS HTTP EXCEPTION');
    } else {
      console.log(exception);
      console.log('UNABLE TO HANDLE THIS ERROR');
      const DEFAULT_ERROR_STATUS = HttpStatus.INTERNAL_SERVER_ERROR;
      response.status(DEFAULT_ERROR_STATUS).json(JSON.stringify(exception));
    }
  }
}
