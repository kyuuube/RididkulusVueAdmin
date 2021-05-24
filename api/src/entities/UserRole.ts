import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { AuthUser } from './AuthUser'
import { Role } from './Role'

@Index('userId', ['userId'], {})
@Index('roleId', ['roleId'], {})
@Entity('user_role', { schema: 'stock_demo' })
export class UserRole {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number

    @Column('varchar', { name: 'roleId', length: 100 })
    roleId: string

    @Column('varchar', { name: 'userId', length: 100 })
    userId: string

    @ManyToOne(() => AuthUser, (authUser) => authUser.userRoles, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
    })
    @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
    user: AuthUser

    @ManyToOne(() => Role, (role) => role.userRoles, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
    })
    @JoinColumn([{ name: 'roleId', referencedColumnName: 'id' }])
    role: Role
}
