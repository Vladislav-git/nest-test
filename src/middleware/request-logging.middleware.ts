import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    res.on('finish', async () => {
      const duration = Date.now() - start;
      const requestData = {
        method: req.method,
        url: req.url,
        headers: req.headers,
        body: req.body,
      };
      const responseData = res.locals.data;
      const httpStatus = res.statusCode;

      try {
        axios.post('http://localhost:8765/logging', {
          duration,
          requestData,
          responseData,
          httpStatus,
        });
      } catch (e) {
        console.log('Error sending request to logging service', e);
      }

      console.log(duration, requestData, responseData, httpStatus);
    });

    next();
  }
}
