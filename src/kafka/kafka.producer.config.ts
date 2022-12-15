import { Transport } from '@nestjs/microservices';
import { ClientProviderOptions } from '@nestjs/microservices/module/interfaces';

export const kafkaConfig = {
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: ['localhost:9092'],
    },
  },
} as ClientProviderOptions;
