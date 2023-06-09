import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as bodyParser from 'body-parser';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    const config = new DocumentBuilder()
        .setTitle('PolyTalks')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(8080);
}

bootstrap();
