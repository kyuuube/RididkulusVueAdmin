import { Injectable, Logger, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { getConnection, Repository } from 'typeorm'
import { Role } from '../../entities/Role'
import { CreateRoleDto } from './dto/role.dto'
import { QueryDto } from '../../dto/common.dto'
import snowflake from '../../utils/snowflake'
import { Permission } from '../../entities/Permission'
import { Menu } from '../../entities/Menu'
import { UserRole } from '../../entities/UserRole'

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
        @InjectRepository(Menu)
        private readonly menuRepository: Repository<Menu>,
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>,

        @InjectRepository(UserRole)
        private readonly userRoleRepository: Repository<UserRole>
    ) {}

    private logger = new Logger('RoleService')

    /**
     * 角色列表 QueryBuilder方式查询
     * @param params
     * @returns
     */
    public async getRoleList(params: QueryDto) {
        const pageIndex = params.pageIndex ? params.pageIndex : 1
        const pageSize = params.pageSize ? params.pageSize : 10
        let keyWordsWhere = ''
        if (params.keywords) {
            keyWordsWhere += 'ro.name like :name'
        }
        const { totalNum } = await this.roleRepository
            .createQueryBuilder('ro')
            .select('COUNT(1)', 'totalNum')
            .where(keyWordsWhere, {
                name: '%' + params.keywords + '%',
            })
            .getRawOne()

        const stockList = await this.roleRepository
            .createQueryBuilder('ro')
            .select()
            .where(keyWordsWhere, {
                name: '%' + params.keywords + '%',
            })
            .skip((pageIndex - 1) * pageSize)
            .take(pageSize)
            .getMany()
        return {
            list: stockList,
            totalNum,
            pageIndex,
            pageSize,
        }
    }

    /**
     * 新建角色
     * @returns
     * @param dto
     */
    public async createRole(dto: CreateRoleDto) {
        dto.id = snowflake.generate()
        const role = Object.assign(new Role(), dto)
        const menus = await this.menuRepository.findByIds(dto.menuIdList)
        const permissions = await this.permissionRepository.findByIds(
            dto.permissionIdList
        )
        role.menus = menus
        role.permissions = permissions
        await this.roleRepository.save(role)
        return {
            code: HttpStatus.OK,
        }
    }

    /**
     * 删除角色
     * @returns
     * @param id
     */
    public async deleteRole(id: string) {
        let result = false
        const res = await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Role)
            .where('id = :id', { id })
            .execute()
        if (res.affected > 0) {
            result = true
        }
        return result
    }

    /**
     * 查看角色
     * @returns
     * @param id
     */
    public async roleInfo(id: string) {
        return await this.roleRepository
            .createQueryBuilder('r')
            .leftJoinAndSelect('r.menus', 'menus')
            .leftJoinAndSelect('r.permissions', 'permissions')
            .where('r.id = :id', { id })
            .getOne()
    }

    /**
     * 修改角色
     * @returns
     * @param dto
     */
    public async editRole(dto: CreateRoleDto) {
        const role = Object.assign(new Role(), dto)
        const menus = await this.menuRepository.findByIds(dto.menuIdList)
        const permissions = await this.permissionRepository.findByIds(
            dto.permissionIdList
        )
        role.menus = menus
        role.permissions = permissions
        return await this.roleRepository.save(role)
    }
    /**
     * 获取角色列表
     * @returns
     */
    public async roleAllList() {
        return await this.roleRepository.find()
    }
}
