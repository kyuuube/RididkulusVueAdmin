import {
    Controller,
    Get,
    Logger,
    Post,
    Body,
    UseGuards,
    Param,
    Put,
    Delete,
    Query,
    Request,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ArticleDto, ArticleQueryDto } from './dto/article.dto'
import { ArticleService } from './article.service'
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'

@Controller('article')
@ApiTags('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Get('/list')
    @ApiOperation({ summary: '获取用户文章列表' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    public loadContentDetail(@Query() params: ArticleQueryDto, @Request() req) {
        return this.articleService.contentList({
            ...params,
            authorId: req.user.uid,
        })
    }

    @Post('/create')
    @ApiOperation({ summary: '创建文章' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    public createContent(@Body() dto: ArticleDto, @Request() req) {
        return this.articleService.createPost({
            ...dto,
            authorId: req.user.uid,
        })
    }

    @Put('/edit')
    @ApiOperation({ summary: '修改文章' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    public editContent(@Body() dto: ArticleDto, @Request() req) {
        return this.articleService.editPost({
            ...dto,
            authorId: req.user.uid,
        })
    }

    @Delete('/delete/:id')
    @ApiOperation({ summary: '删除文章' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    public deleteContent(@Param('id') id: string) {
        return this.articleService.deletePost(id)
    }

    @Get('/detail/:id')
    @ApiOperation({ summary: '文章' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    public contentDetail(@Param('id') id: string) {
        return this.articleService.contentDetail(id)
    }

    // @Get('/posts')
    // @ApiOperation({ summary: '文章列表' })
    // public getPosts(@Query() params: ArticleQueryDto) {
    //     return this.articleService.posts(params)
    // }

    @Get('/public/posts')
    @ApiOperation({ summary: '公开文章列表' })
    public getPublicPosts(@Query() params: ArticleQueryDto) {
        return this.articleService.allPublicArticle(params)
    }
}
