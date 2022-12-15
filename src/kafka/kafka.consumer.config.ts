import { Transport } from '@nestjs/microservices';
import { ClientProviderOptions } from '@nestjs/microservices/module/interfaces';

export const kafkaConsumerConfig = {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      }
    }
} as ClientProviderOptions;