import { IsString, IsNotEmpty } from 'class-validator'
import { QueryDto } from '../../../dto/common.dto'
export class ArticleDto {
    public id: string
    @IsString()
    @IsNotEmpty()
    public readonly title: string
    @IsString()
    public readonly content: string

    @IsNotEmpty()
    public readonly status: number

    public readonly authorId?: string

    public authorName?: string
}

export class ArticleQueryDto extends QueryDto {
    public readonly title?: string
    public readonly status?: number
    public authorName?: string
    public readonly authorId?: string
}
