import { HttpStatus, Injectable, Logger } from '@nestjs/common'
import { Menu } from '../../entities/Menu'
import { UserRole } from '../../entities/UserRole'
import { Role } from '../../entities/Role'
import { Permission } from '../../entities/Permission'
import { Repository, TreeRepository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { MenuDto } from './dto/menu.dto'
import { QueryDto } from '../../dto/common.dto'
import snowflake from '../../utils/snowflake'
import { uniqBy } from 'lodash'
import { buildTreeList } from '../../utils/common'

@Injectable()
export class MenuService {
    constructor(
        @InjectRepository(Menu)
        private readonly menuRepository: Repository<Menu>,
        @InjectRepository(Menu)
        private readonly treeRepository: TreeRepository<Menu>,

        @InjectRepository(UserRole)
        private readonly userRoleRepository: Repository<UserRole>,

        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,

        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>
    ) {}

    private logger = new Logger('MenuService')

    public async createMenu(dto: MenuDto) {
        dto.id = snowflake.generate()
        let newMenu: Menu = Object.assign(new Menu(), dto)
        if (dto?.parentId && dto.parentId) {
            const parentDto = await this.menuRepository.findOne(dto.parentId)
            const parent = Object.assign(new Menu(), parentDto)
            newMenu = Object.assign(new Menu(), dto)
            newMenu.parent = parent
        }
        await this.menuRepository.save(Object.assign(new Menu(), newMenu))

        return {
            code: HttpStatus.OK,
        }
    }

    public async editMenu(dto: MenuDto) {
        await this.menuRepository.update(dto.id, dto)

        return {
            code: HttpStatus.OK,
        }
    }

    public async deleteMenu(id: string) {
        await this.menuRepository.delete(id)
        return {
            code: HttpStatus.OK,
        }
    }

    public async menuDetail(id: string) {
        const role = await this.menuRepository.findOne({ id })
        return {
            code: HttpStatus.OK,
            role,
        }
    }

    public async authority() {
        const menus: any[] = await this.menuRepository
            .createQueryBuilder('c')
            .orderBy('c.id', 'DESC')
            .getMany()

        const authority = await this.permissionRepository
            .createQueryBuilder('c')
            .orderBy('c.id', 'DESC')
            .getMany()

        menus.forEach((i) => {
            i.authority = authority.filter((a) => a.menuId === i.id)
        })
        return buildTreeList(menus)
    }

    public async menuList(params: QueryDto) {
        const pageIndex = params.pageIndex ? params.pageIndex : 1
        const pageSize = params.pageSize ? params.pageSize : 10
        let keyWordsWhere = ''
        if (params.keywords) {
            keyWordsWhere += 'ro.name like :name'
        }
        const { totalNum } = await this.menuRepository
            .createQueryBuilder('ro')
            .select('COUNT(1)', 'totalNum')
            .where(keyWordsWhere, {
                name: '%' + params.keywords + '%',
            })
            .getRawOne()

        const list = await this.menuRepository
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

    public async menuTree() {
        return await this.treeRepository.findTrees()
    }

    public async getMenu(user: any) {
        const roleList = await this.userRoleRepository.find({
            where: { userId: user.uid },
        })
        const menuList = await this.roleRepository
            .createQueryBuilder('r')
            .leftJoinAndSelect('r.menus', 'menu')
            .getMany()

        const list = menuList.filter((i) =>
            roleList.some((r) => r.roleId === i.id)
        )

        let tempList: any[] = []

        list.forEach((i) => {
            tempList = [...tempList, ...i.menus]
        })

        tempList = uniqBy(tempList, 'id')
        return buildTreeList(tempList)
    }
}
