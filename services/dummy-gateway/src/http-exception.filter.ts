import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    console.log(exception.message);
    console.log(exception.name);
    console.log('in exception catch...');
    const ctx = host.switchToHttp();
    // const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // const status = exception.getStatus();
    switch (exception.name) {
      case 'DISABLED_ACCESSKEY_ERROR':
        return host.switchToHttp().getResponse<Response>().status(403).json({
          statusCode: HttpStatus.FORBIDDEN,
          message: exception.message,
          timestamp: new Date().toISOString(),
          path: request.url,
        });
      case 'EXPIRED_ACCESSKEY_ERROR':
        return host.switchToHttp().getResponse<Response>().status(403).json({
          statusCode: HttpStatus.FORBIDDEN,
          message: exception.message,
          timestamp: new Date().toISOString(),
          path: request.url,
        });
      case 'ACCESSKEY_LIMIT_ERROR':
        return host.switchToHttp().getResponse<Response>().status(403).json({
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          message: exception.message,
          timestamp: new Date().toISOString(),
          path: request.url,
        });
      default:
        return host.switchToHttp().getResponse<Response>().status(500).json({
          statusCode: 500,
          message: exception.message,
          timestamp: new Date().toISOString(),
          path: request.url,
        });
    }
    // response.status(status).json({
    //   statusCode: status,
    //   timestamp: new Date().toISOString(),
    //   path: request.url,
    // });
  }
}
