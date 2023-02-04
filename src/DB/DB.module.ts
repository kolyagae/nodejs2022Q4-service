import { Module, Global } from '@nestjs/common';
import { DBService } from './DB.service';

@Global()
@Module({
  exports: [DBService],
  controllers: [],
  providers: [DBService],
})
export class DBModule {}
