import { Module, Logger } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { CandlesController } from './candles.controller';
import { CandlesService } from './candles.service';
import { KafkaService } from '../kafka/kafka.service';
import { ApiModule } from 'src/api/api.module';

@Module({
  imports: [
    ApiModule,
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        ...KafkaService.config,
      },
    ]),
  ],
  providers: [
    CandlesService,
    Logger,
    KafkaService.provider,
  ],
  controllers: [CandlesController],
})
export class CandlesModule {}
