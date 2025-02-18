import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as exphbs from 'express-handlebars';
import * as methodOverride from 'method-override';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.engine('hbs', exphbs.engine({ extname: '.hbs', defaultLayout: 'main' }));

  //method-override
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  app.use(methodOverride('_method'));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
