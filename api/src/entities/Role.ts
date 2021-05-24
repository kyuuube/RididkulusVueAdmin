import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm'
import { Menu } from './Menu'
import { Permission } from './Permission'
import { UserRole } from './UserRole'

@Entity('role', { schema: 'stock_demo' })
export class Role {
    @Column('varchar', { primary: true, name: 'id', length: 128 })
    id: string

    @Column('varchar', { name: 'name', length: 128 })
    name: string

    @Column('varchar', { name: 'description', length: 128 })
    description: string

    @Column('varchar', { name: 'status', length: 128 })
    status: string

    @Column('timestamp', {
        name: 'createdAt',
        default: () => "'CURRENT_TIMESTAMP(6)'",
    })
    createdAt: Date

    @Column('timestamp', {
        name: 'updatedAt',
        default: () => "'CURRENT_TIMESTAMP(6)'",
    })
    updatedAt: Date

    @ManyToMany(() => Menu, (menu) => menu.roles)
    @JoinTable({
        name: 'menu_roles_role',
        joinColumns: [{ name: 'roleId', referencedColumnName: 'id' }],
        inverseJoinColumns: [{ name: 'menuId', referencedColumnName: 'id' }],
        schema: 'stock_demo',
    })
    menus: Menu[]

    @ManyToMany(() => Permission, (permission) => permission.roles)
    @JoinTable({
        name: 'permission_roles_role',
        joinColumns: [{ name: 'roleId', referencedColumnName: 'id' }],
        inverseJoinColumns: [
            { name: 'permissionId', referencedColumnName: 'id' },
        ],
        schema: 'stock_demo',
    })
    permissions: Permission[]

    @OneToMany(() => UserRole, (userRole) => userRole.role)
    userRoles: UserRole[]
}
