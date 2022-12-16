import { ClientKafka } from '@nestjs/microservices';

export type KafkaProvider = {
  provide: string;
  useFactory: (kafkaService: ClientKafka) => Promise<any>;
  inject: string[];
}