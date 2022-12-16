import { Module } from '@nestjs/common';

import { CandlesService } from './candles.service';

@Module({
  exports: [CandlesService],
  providers: [CandlesService],
})
export class CandlesModule {}
