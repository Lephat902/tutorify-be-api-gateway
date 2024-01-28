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
    console.log(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json(exception.getResponse());
      return;
    }

    try {
      response.json(exception.error);
    } catch (error) {
      console.log(error);
      const DEFAULT_ERROR_STATUS = HttpStatus.INTERNAL_SERVER_ERROR;
      response.status(DEFAULT_ERROR_STATUS).json({
        exception,
        statusCode: DEFAULT_ERROR_STATUS,
      });
    }
  }
}
