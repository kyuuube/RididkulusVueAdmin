import { HttpStatus, Injectable, Logger } from '@nestjs/common'
import { Permission } from '../../entities/Permission'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { PermissionDto } from './dto/permissions.dto'
import { QueryDto } from '../../dto/common.dto'
import snowflake from '../../utils/snowflake'

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Permission)
        private readonly permRepository: Repository<Permission>
    ) {}

    private logger = new Logger('MenuService')

    public async createPerm(dto: PermissionDto) {
        dto.id = snowflake.generate()
        const tmp = Object.assign(new PermissionDto(), dto)
        await this.permRepository.save(tmp)

        return {
            code: HttpStatus.OK,
        }
    }

    public async deletePerm(id: string) {
        await this.permRepository.delete(id)

        return {
            code: HttpStatus.OK,
        }
    }

    public async editPerm(dto: PermissionDto) {
        await this.permRepository.update(dto.id, dto)

        return {
            code: HttpStatus.OK,
        }
    }

    public async permDetail(id: string) {
        const role = await this.permRepository.findOne({ id })
        return {
            code: HttpStatus.OK,
            role,
        }
    }

    public async permList(params: QueryDto) {
        const pageIndex = params.pageIndex ? params.pageIndex : 1
        const pageSize = params.pageSize ? params.pageSize : 10
        let keyWordsWhere = ''
        if (params.keywords) {
            keyWordsWhere += 'ro.name like :name'
        }
        const { totalNum } = await this.permRepository
            .createQueryBuilder('ro')
            .select('COUNT(1)', 'totalNum')
            .where(keyWordsWhere, {
                name: '%' + params.keywords + '%',
            })
            .getRawOne()

        const list = await this.permRepository
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
}
