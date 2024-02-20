import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { ClassSerializerInterceptor, INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { GlobalExceptionsFilter } from './global-exception-handler';

async function bootstrap() {
  // Create Nest application instance
  const app = await NestFactory.create(AppModule);

  // Get ConfigService instance
  const configService = app.get(ConfigService);

  // Enable CORS (Note: Remove this line or configure properly for production)
  app.enableCors();

  // Apply the custom exception filter globally
  app.useGlobalFilters(new GlobalExceptionsFilter());

  // Use helmet middleware for security headers
  app.use(helmet());

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
  setUpSwagger(app, configService);
  
  // Start the application and listen on the specified port
  await app.listen(configService.get<number>('PORT'));
}

const setUpSwagger = (app: INestApplication<any>, configService: ConfigService) => {
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
