import { HttpStatus, Injectable } from '@nestjs/common'
import { Article } from '../../entities/Article'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { ArticleDto, ArticleQueryDto } from './dto/article.dto'
import snowflake from '../../utils/snowflake'
import { UserService } from '../user/user.service'
import { BusiException } from '../../libs/filters/busi.exception'
import { BusiErrorCode } from '../../libs/enums/error-code-enum'

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private readonly articleRepository: Repository<Article>,
        private readonly userService: UserService
    ) {}

    /**
     * 获取用户文章列表
     * @params ArticleQueryDto
     * @returns {
     *      list,
            totalNum,
            pageIndex,
            pageSize, }
     */
    public async contentList(params: ArticleQueryDto) {
        const pageIndex = params.pageIndex ? params.pageIndex : 1
        const pageSize = params.pageSize ? params.pageSize : 10
        let keyWordsWhere = 'c.authorId = :authorId'
        if (params.keywords) {
            keyWordsWhere += '& c.title like :name'
        }
        if (params.status) {
            keyWordsWhere += '& c.status = :status'
        }
        const { totalNum } = await this.articleRepository
            .createQueryBuilder('c')
            .select('COUNT(1)', 'totalNum')
            .where(keyWordsWhere, {
                name: '%' + params.keywords + '%',
                authorId: params.authorId,
                status: params.status,
            })
            .getRawOne()
        const list = await this.articleRepository
            .createQueryBuilder('c')
            .where(keyWordsWhere, {
                name: '%' + params.keywords + '%',
                authorId: params.authorId,
                status: params.status,
            })
            .orderBy('c.id', 'DESC')
            .skip((pageIndex - 1) * pageSize)
            .take(pageSize)
            .getMany()

        return {
            list: list,
            totalNum,
            pageIndex,
            pageSize,
        }
    }

    /**
     * 获取所有文章列表
     * @params ArticleQueryDto
     * @returns {
     *      list,
            totalNum,
            pageIndex,
            pageSize, }
     */
    public async posts(params: ArticleQueryDto) {
        const pageIndex = params.pageIndex ? params.pageIndex : 1
        const pageSize = params.pageSize ? params.pageSize : 10
        let keyWordsWhere = ''
        if (params.keywords) {
            keyWordsWhere += 'ro.title like :name'
        }
        const { totalNum } = await this.articleRepository
            .createQueryBuilder('ro')
            .select('COUNT(1)', 'totalNum')
            .where(keyWordsWhere, {
                name: '%' + params.keywords + '%',
            })
            .getRawOne()

        const list = await this.articleRepository
            .createQueryBuilder('ro')
            .select()
            .where(keyWordsWhere, {
                name: '%' + params.keywords + '%',
            })
            .skip((pageIndex - 1) * pageSize)
            .take(pageSize)
            .getMany()
        return {
            list: list,
            totalNum,
            pageIndex,
            pageSize,
        }
    }

    /**
     * 创建用户文章
     * @params ArticleDto
     * @returns
     */
    public async createPost(dto: ArticleDto) {
        console.log(dto)
        const user = await this.userService.userDetail(dto.authorId)
        dto.id = snowflake.generate()
        dto.authorName = user.name
        const newPost: Article = Object.assign(new Article(), dto)
        return await this.articleRepository.save(
            Object.assign(new Article(), newPost)
        )
    }

    /**
     * 修改用户文章
     * @params ArticleDto
     * @returns
     */
    public async editPost(dto: ArticleDto) {
        const getFromDB = await this.articleRepository.findOne({
            id: dto.id,
        })
        if (!getFromDB) {
            throw new BusiException(
                BusiErrorCode.NOT_FOUND,
                '错误：没有找到可修改文章',
                HttpStatus.OK
            )
        }
        const content = this.articleRepository.create(dto)
        // merge 只是合并并没有对数据进行保存
        const edited = await this.articleRepository.merge(getFromDB, content)
        return await this.articleRepository.save(edited)
    }

    /**
     * 删除用户文章
     * @params id
     * @returns
     */
    public async deletePost(id: string) {
        return await this.articleRepository.delete(id)
    }

    /**
     * 文章详情
     * @params id
     * @returns
     */
    public async contentDetail(id: string) {
        return await this.articleRepository.findOne({ id })
    }

    /**
     * 获取所有可公开文章
     * @params
     * @returns
     */
    public async allPublicArticle(params: ArticleQueryDto) {
        const articles = await this.posts(params).catch((e) => e)
        articles.list = articles.list.filter((i) => i.status > 3)
        return articles
    }
}
