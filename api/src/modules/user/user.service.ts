import { HttpStatus, Injectable } from '@nestjs/common'
import { StUser } from '../../entities/StUser'
import { AuthUser } from '../../entities/AuthUser'
import { UserRole } from '../../entities/UserRole'
import { InjectRepository } from '@nestjs/typeorm'
import { getConnection, Repository } from 'typeorm'
import { CreateUserDto, EditUserDto } from './dto/user.dto'
import { BusiException } from '../../libs/filters/busi.exception'
import { BusiErrorCode } from '../../libs/enums/error-code-enum'
import snowflake from '../../utils/snowflake'
import { QueryDto } from '../../dto/common.dto'
import { CreateRoleDto } from '../role/dto/role.dto'
import { Role } from '../../entities/Role'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs')

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(StUser)
        private readonly stUserRepository: Repository<StUser>,
        @InjectRepository(AuthUser)
        private readonly userRepository: Repository<AuthUser>,
        @InjectRepository(UserRole)
        private readonly userRoleRepository: Repository<UserRole>
    ) {}
    private toSaveUserRoles(user: CreateUserDto, userId: string) {
        if (user?.roleIds) {
            const ids = user.roleIds
            ids.forEach((id) => {
                const userRole: UserRole = this.userRoleRepository.create({
                    userId,
                    roleId: id,
                })
                this.userRoleRepository.save(userRole)
            })
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async create(dto: CreateUserDto) {
        // const user = this.stUserRepository.create(dto);
        // const salt = bcrypt.genSaltSync(10);
        // user.salt = salt;
        // user.password = bcrypt.hashSync(user.password, salt);
        // return this.stUserRepository
        //   .save(user)
        //   .then((res) => {
        //     return { id: res.id };
        //   })
        //   .catch((err) => {
        //     throw new BusiException(BusiErrorCode.PARAM_ERROR, err.message);
        //   });
    }
    async findByMobile(mobile: string): Promise<AuthUser> {
        return await this.userRepository.findOne({ mobile })
    }

    /**
     * 新建用户
     * @param dto
     * @returns
     */
    async createUser(dto: CreateUserDto) {
        const existsUser = await this.userRepository.findOne({
            mobile: dto.mobile,
        })
        if (existsUser) {
            throw new BusiException(
                BusiErrorCode.NOT_FOUND,
                'User with provided email or phone number already exists',
                HttpStatus.OK
            )
        }
        dto.id = snowflake.generate()
        const user = this.userRepository.create(dto)
        const salt = bcrypt.genSaltSync(10)
        user.passwordSalt = salt
        user.password = bcrypt.hashSync(user.password, salt)
        this.toSaveUserRoles(dto, user.id)
        this.userRepository.save(user)
        return true
    }

    /**
     * 用户列表 QueryBuilder方式查询
     * @param params
     * @returns
     */
    public async getUserList(params: QueryDto) {
        const pageIndex = params.pageIndex ? params.pageIndex : 1
        const pageSize = params.pageSize ? params.pageSize : 10
        let keyWordsWhere = ''
        if (params.keywords) {
            keyWordsWhere += 'ro.name like :name'
        }
        const { totalNum } = await this.userRepository
            .createQueryBuilder('u')
            .select('COUNT(1)', 'totalNum')
            .where(keyWordsWhere, {
                name: '%' + params.keywords + '%',
            })
            .getRawOne()

        const userList = await this.userRepository
            .createQueryBuilder('u')
            .select()
            .where(keyWordsWhere, {
                name: '%' + params.keywords + '%',
            })
            .skip((pageIndex - 1) * pageSize)
            .take(pageSize)
            .getMany()
        return {
            list: userList,
            totalNum,
            pageIndex,
            pageSize,
        }
    }

    /**
     * 删除用户
     * @returns
     * @param id
     */
    public async deleteUser(id: string) {
        let result = false
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(UserRole)
            .where('userId = :id', { id })
            .execute()
        const res = await getConnection()
            .createQueryBuilder()
            .delete()
            .from(AuthUser)
            .where('id = :id', { id })
            .execute()
        if (res.affected > 0) {
            result = true
        }
        return result
    }

    /**
     * 用户详情
     * @returns
     * @param id
     */
    public async userDetail(id: string) {
        console.log(id)
        const user = await this.userRepository
            .createQueryBuilder('u')
            .where('u.id = :id', { id })
            .getOne()
        const roleIds = await this.findRoleIds(id)
        return UserService.toPublicUser(user, false, roleIds)
    }

    /**
     * 修改用户
     * @param dto
     * @returns
     */
    public async editUser(dto: EditUserDto) {
        const getUserFromDB = await this.userRepository.findOne({
            id: dto.id,
        })
        // 如果没有查询到用户不则抛错误
        if (!getUserFromDB) {
            throw new BusiException(
                BusiErrorCode.NOT_FOUND,
                '错误：没有找到可修改用户',
                HttpStatus.OK
            )
        }
        const user = this.userRepository.create(dto)
        // 在有提交密码的情况下，要更新数据库的salt
        if (dto.password) {
            const salt = bcrypt.genSaltSync(10)
            user.passwordSalt = salt
            user.password = bcrypt.hashSync(user.password, salt)
        }
        await this.toUpdateUserRoles(dto, dto.id)
        // merge 只是合并并没有对数据进行保存
        const editedUser = await this.userRepository.merge(getUserFromDB, user)
        // to public 方法移除敏感数据再返回
        return UserService.toPublicUser(
            await this.userRepository.save(editedUser)
        )
    }

    /**
     * 更新用户角色
     * @params user, userId
     * @returns
     */
    private async toUpdateUserRoles(
        user: CreateUserDto | EditUserDto,
        userId: string
    ) {
        if (user?.roleIds) {
            await this.userRoleRepository
                .createQueryBuilder('c')
                .delete()
                .where('userId = :userId', { userId })
                .execute()

            const ids = user.roleIds
            ids.forEach((id) => {
                const userRole: UserRole = this.userRoleRepository.create({
                    userId,
                    roleId: id,
                })
                this.userRoleRepository.save(userRole)
            })
        }
    }

    /**
     * 移除敏感信息
     * @params authUser, caching, roleIds
     * @returns
     */
    private static toPublicUser(
        auth: AuthUser,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        caching = false,
        roleIds?: string[]
    ): any {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, passwordSalt, ...publicUser } = auth
        console.log(auth)
        // if (caching) {
        //   cacheManager.set(
        //     publicUser.id,
        //     {
        //       ...publicUser,
        //       roleIds
        //     },
        //     { ttl: 1000 },
        //     (err, result) => {
        //       this.logger.log({ result, err })
        //     }
        //   )
        // }
        return { ...publicUser, roleIds }
    }
    /**
     * 查询角色
     * @params authUser, caching, roleIdsid
     * @returns
     */
    private async findRoleIds(id: string) {
        const list = await this.userRoleRepository.find({
            where: { userId: id },
        })
        return list.map((i) => i.roleId)
    }
}
