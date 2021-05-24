import { Column, Entity, ManyToMany } from 'typeorm'
import { Role } from './Role'

@Entity('permission', { schema: 'stock_demo' })
export class Permission {
    @Column('varchar', { primary: true, name: 'id', length: 128 })
    id: string

    @Column('varchar', { name: 'menuId', length: 128 })
    menuId: string

    @Column('varchar', { name: 'name', length: 128 })
    name: string

    @Column('varchar', { name: 'description', length: 128 })
    description: string

    @Column('int', { name: 'type', default: () => "'0'" })
    type: number

    @Column('varchar', { name: 'path', length: 128 })
    path: string

    @Column('varchar', { name: 'slug', length: 128 })
    slug: string

    @Column('varchar', { name: 'methods', length: 128 })
    methods: string

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

    @ManyToMany(() => Role, (role) => role.permissions)
    roles: Role[]
}
