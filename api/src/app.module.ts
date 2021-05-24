import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './modules/user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './modules/auth/auth.module'
import { StockModule } from './modules/stock/stock.module'
import { ScheduleModule } from '@nestjs/schedule'
import { RoleModule } from './modules/role/role.module'
import { MenuModule } from './modules/menu/menu.module'
import { PermissionModule } from './modules/permission/permission.module'
import { PermissionController } from './modules/permission/permission.controller'
import { ArticleModule } from './modules/article/article.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            name: 'default',
            type: 'mysql',
            host: '159.75.76.150',
            port: 3306,
            username: 'root',
            password: 'Ev0709.20210402',
            database: 'stock_demo',
            synchronize: false,
            entities: [__dirname + '/entities/*.js'],
        }),
        ScheduleModule.forRoot(),
        UserModule,
        AuthModule,
        StockModule,
        RoleModule,
        MenuModule,
        PermissionModule,
        ArticleModule,
    ],
    controllers: [AppController, PermissionController],
    providers: [AppService],
})
export class AppModule {}
