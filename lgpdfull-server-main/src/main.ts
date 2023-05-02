import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ConflictInterceptor } from './app/common/errors/interceptors/conflict.interceptor';
import { DatabaseInterceptor } from './app/common/errors/interceptors/database.interceptor';
import { UnauthorizedInterceptor } from './app/common/errors/interceptors/unauthorized.interceptor';
import { NotFoundInterceptor } from './app/common/errors/interceptors/notfound.interceptor';
import { ServiceInterceptor } from './app/common/errors/interceptors/conflict.interceptor copy';
// 
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalInterceptors(new ConflictInterceptor());
  app.useGlobalInterceptors(new DatabaseInterceptor());
  app.useGlobalInterceptors(new UnauthorizedInterceptor());
  app.useGlobalInterceptors(new NotFoundInterceptor());
  app.useGlobalInterceptors(new ServiceInterceptor());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
