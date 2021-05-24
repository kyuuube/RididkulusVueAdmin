import { NestFactory } from '@nestjs/core'
import { TransformInterceptor } from './libs/interceptors/data.interceptor'
import { AppModule } from './app.module'
import * as helmet from 'helmet'
import { HttpExceptionFilter } from './libs/filters/http-exception.filter'
import { ParamsValidationPipe } from './libs/pipes/params-validation.pipe'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as csurf from 'csurf'
import * as cookieParser from 'cookie-parser'
// import { HelperMiddleware } from './middleware/helper.middleware'
// @ts-ignore
import * as basicAuth from 'express-basic-auth'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalInterceptors(new TransformInterceptor())
    app.useGlobalFilters(new HttpExceptionFilter())
    app.useGlobalPipes(new ParamsValidationPipe())
    // app.use(helmet());
    const options = new DocumentBuilder()
        .setTitle('rosetta-latte.art api')
        .setContact('qb', 'https://kyuuu.be', 'benchiu@yandex.com')
        .setBasePath('rosetta-latte.art/api')
        .setDescription('rosetta-latte.art DEMO/APIs')
        .setVersion('1.0')
        .build()
    const document = SwaggerModule.createDocument(app, options)
    app.use(
        '/api',
        basicAuth({
            challenge: true,
            users: { ['admin']: 'apiPassword' },
        })
    )
    SwaggerModule.setup('api', app, document)
    app.enableCors({
        origin: 'http://admin.rosetta-latte.art',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
    })
    app.use(cookieParser())
    app.use(
        csurf({
            cookie: {
                key: '_csrf_token',
                sameSite: true,
            },
        })
    )
    // app.use(HelperMiddleware)
    app.use(helmet())
    app.use((err: any, req: any, res: any, next: any) => {
        if (err.code === 'EBADCSRFTOKEN') {
            // handle CSRF token errors here
            res.status(403)
            res.json({
                code: 403,
                msg: 'invalid csrf token',
            })
        }
        next()
    })
    await app.listen(3000)
}
bootstrap()
