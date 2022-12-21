import { Transport } from '@nestjs/microservices';
import { ClientProviderOptions } from '@nestjs/microservices/module/interfaces';

export class KafkaService {
  public static get config(): ClientProviderOptions {
    return {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['kafka:9092'],
        },
      },
    } as ClientProviderOptions;
  }
}
