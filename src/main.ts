import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import {
  ClassSerializerInterceptor,
  INestApplication,
  InternalServerErrorException,
  ValidationPipe,
} from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { GlobalExceptionsFilter } from './global-exception-handler';

async function bootstrap() {
  // Create Nest application instance
  const app = await NestFactory.create(AppModule);

  // Get ConfigService instance
  const configService = app.get(ConfigService);

  // Enable CORS with specific domain patterns
  app.enableCors({
    allowedHeaders: ['content-type'],
    credentials: true,
    methods: 'GET,PUT,POST,PATCH,DELETE,UPDATE,OPTIONS',
    origin: (origin, callback) => {
      if (!origin) {
        // Allow requests with no origin (like mobile apps or curl requests)
        return callback(null, true);
      }
      // Define the regular expression pattern for the Vercel app domain
      const vercelPattern =
        /^https:\/\/tutorify-[a-zA-Z0-9-]+-caotrananhkhoa\.vercel\.app$/;
      // Define the regular expression pattern for localhost
      const localhostPattern = /^https?:\/\/localhost(?::\d+)?$/; // Match http://localhost[:port_number]
      // Define the regular expression pattern for tutorify.site subdomains
      const tutorifyPattern = /^https?:\/\/[a-zA-Z0-9-]+\.tutorify\.site$/;

      // Use RegExp.test() to match the patterns
      if (
        origin === 'https://tutorify-project.vercel.app' ||
        vercelPattern.test(origin) ||
        localhostPattern.test(origin) ||
        tutorifyPattern.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(new InternalServerErrorException('Not allowed by CORS'));
      }
    },
  });

  // Apply the custom exception filter globally
  app.useGlobalFilters(new GlobalExceptionsFilter());

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
  setUpSwagger(app, configService);

  // Start the application and listen on the specified port
  await app.listen(configService.get<number>('PORT'));
}

const setUpSwagger = (
  app: INestApplication<any>,
  configService: ConfigService,
) => {
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
