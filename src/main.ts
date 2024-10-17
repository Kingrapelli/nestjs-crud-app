import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const microservice = app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.KAFKA,
      options: {
          client: {
              brokers: ['localhost:9092'],
          }
          ,consumer: {
            groupId: 'my-consumer-group',
          },
      },
  });

  try{
    await app.startAllMicroservices();
    await app.listen(process.env.PORT ?? 9090);
    console.log("Connected to Microservices")
  }catch(error){
    console.error('Error at starting microservices:', error);
  }
}
bootstrap();
