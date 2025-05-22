import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import './firebase/firebase-admin.provider'; // This triggers firebase-admin initialization from import alone


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
