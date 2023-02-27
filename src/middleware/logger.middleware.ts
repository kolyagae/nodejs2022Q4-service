import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MyLogger } from 'src/logging/logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new MyLogger();

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const { body, query, url } = req;
      const { statusCode } = res;

      if (statusCode < 400) {
        const message = `STATUS CODE: ${statusCode} | URL: ${JSON.stringify(
          url,
        )} | QUERY PARAMETERS: ${JSON.stringify(
          query,
        )} | BODY: ${JSON.stringify(body)}`;

        this.logger.log(message);
      }
    });

    next();
  }
}
