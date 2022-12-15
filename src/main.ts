import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { kafkaConsumerConfig } from './kafka/kafka.consumer.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.connectMicroservice(kafkaConsumerConfig)
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
