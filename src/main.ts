import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { originCallback } from '@tutorify/shared';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './global-exception-filter';

async function bootstrap() {
  // Create Nest application instance
  const app = await NestFactory.create(AppModule);

  // Get ConfigService instance
  const configService = app.get(ConfigService);

  // Enable CORS with specific domain patterns
  app.enableCors({
    credentials: true,
    methods: 'GET,PUT,POST,PATCH,DELETE,UPDATE,OPTIONS',
    origin: originCallback,
  });

  // Apply the custom exception filter globally
  app.useGlobalFilters(new GlobalExceptionFilter());

  // Use helmet middleware for security headers
  app.use(
    helmet({
      // crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          imgSrc: [
            `'self'`,
            'data:',
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
          manifestSrc: [
            `'self'`,
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
        },
      },
    }),
  );

  // Set up global validation pipe to validate input
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // Set up global interceptor to standardize output using class serialization
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Set up Swagger documentation
  if (process.env.DISPLAY_SWAGGER === '1')
    setUpSwagger(app);

  // Start the application and listen on the specified port
  await app.listen(configService.get<number>('PORT'));
}

const setUpSwagger = (app: INestApplication<any>) => {
  // Configure Swagger options
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Tutorify')
    .setDescription('List of endpoints to communicate with Tutorify system')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  // Create Swagger document and set up Swagger UI
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, swaggerDocument);
};

// Call the bootstrap function to start the application
bootstrap();
