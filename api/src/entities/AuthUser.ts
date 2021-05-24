import { Column, Entity, Index, OneToMany } from 'typeorm'
import { UserRole } from './UserRole'

@Index('uk_mobile', ['mobile'], { unique: true })
@Entity('auth_user', { schema: 'stock_demo' })
export class AuthUser {
    @Column('varchar', {
        primary: true,
        name: 'id',
        comment: '主键id',
        length: 128,
    })
    id: string

    @Column('varchar', {
        name: 'mobile',
        unique: true,
        comment: '手机号',
        length: 20,
    })
    mobile: string

    @Column('varchar', { name: 'email', comment: '邮箱', length: 100 })
    email: string

    @Column('timestamp', {
        name: 'createdAt',
        comment: '创建时间',
        default: () => "'CURRENT_TIMESTAMP(6)'",
    })
    createdAt: Date

    @Column('timestamp', {
        name: 'updatedAt',
        comment: '修改时间',
        default: () => "'CURRENT_TIMESTAMP(6)'",
    })
    updatedAt: Date

    @Column('varchar', { name: 'password', comment: '密码', length: 100 })
    password: string

    @Column('varchar', { name: 'passwordSalt', comment: '密码盐', length: 128 })
    passwordSalt: string

    @Column('enum', {
        name: 'gender',
        comment: '性别',
        enum: ['male', 'female', 'other', 'n/a'],
        default: () => "'n/a'",
    })
    gender: 'male' | 'female' | 'other' | 'n/a'

    @Column('varchar', { name: 'name', comment: '昵称', length: 128 })
    name: string

    @Column('varchar', {
        name: 'avatar',
        comment: '头像',
        length: 256,
        default: () => "'https://i.loli.net/2020/02/06/KVJBWRw4LD1teZI.jpg'",
    })
    avatar: string

    @OneToMany(() => UserRole, (userRole) => userRole.user)
    userRoles: UserRole[]
}
