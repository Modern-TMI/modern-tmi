/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

class Server {
  private app: INestApplication;
  private port: string | number;

  async start() {
    this.app = await NestFactory.create(AppModule);
    this.port = process.env.PORT || 3333;

    this.app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      })
    );

    this.setMiddleware();

    this.setupSwagger();

    await this.app.listen(this.port);

    Logger.log(`π Application is running on: http://localhost:${this.port}`);
    Logger.log(
      `π Check your API with Swagger on: http://localhost:${this.port}/swagger`
    );
  }

  private setupSwagger() {
    const options = new DocumentBuilder()
      .setTitle('Modern TMI API')
      .setDescription('Modern TMI API λ¬Έμ')
      .setVersion('0.0.1')
      .build();

    const document = SwaggerModule.createDocument(this.app, options);
    SwaggerModule.setup('swagger', this.app, document);
  }

  private setMiddleware() {
    this.app.enableCors();
    this.app.use(cookieParser());
  }
}

const server = new Server();
server.start();
