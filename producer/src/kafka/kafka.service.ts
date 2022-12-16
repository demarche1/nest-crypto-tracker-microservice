import { KafkaProvider } from '../types/kafka.types'
import { ClientKafka } from '@nestjs/microservices'
import { Transport } from '@nestjs/microservices';
import { ClientProviderOptions } from '@nestjs/microservices/module/interfaces';

export class KafkaService {
  public static get provider(): KafkaProvider {
    return {
      provide: 'KAFKA_PRODUCER',
      useFactory: (kafkaService: ClientKafka) => kafkaService.connect(),
      inject: ['KAFKA_SERVICE'],
    }
  }

  public static get config(): ClientProviderOptions {
    return {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['kafka:9092'],
        },
      },
    } as ClientProviderOptions
  }
}
