import { Module } from '@nestjs/common'
import { ArticleController } from './article.controller'
import { ArticleService } from './article.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Article } from '../../entities/Article'
import { UserModule } from '../user/user.module'

@Module({
    imports: [TypeOrmModule.forFeature([Article]), UserModule],
    controllers: [ArticleController],
    providers: [ArticleService],
    exports: [ArticleService],
})
export class ArticleModule {}
