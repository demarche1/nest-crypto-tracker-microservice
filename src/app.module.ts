import { Module } from '@nestjs/common';
import { CandlesModule } from './candles/candles.module';

@Module({
  imports: [CandlesModule],
})
export class AppModule {}
