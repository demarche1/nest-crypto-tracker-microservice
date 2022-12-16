import { Module } from '@nestjs/common';
import { CandlesModule } from './candles/candles.module';
import { KafkaService } from './kafka/kafka.service';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [
    CandlesModule,
    KafkaModule,
  ],
  providers: [KafkaService],
})
export class AppModule {}
