import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { KafkaService } from './kafka/kafka.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice(KafkaService.config);
  await app.startAllMicroservices();

  await app.listen(5555);
}
bootstrap();
