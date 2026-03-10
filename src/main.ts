import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Enable CORS — allows the React frontend to call this API
    app.enableCors({
        origin: '*', // In production, replace with your Vercel frontend URL
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });

    // Global validation pipe — validates all DTOs automatically
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,        // strip unknown fields
            forbidNonWhitelisted: false,
            transform: true,        // auto-transform types (e.g. string → number)
        }),
    );

    // Global prefix: all routes become /api/students etc.
    app.setGlobalPrefix('api');

    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log(`🚀 Application is running on: http://localhost:${port}/api`);
}

bootstrap();
