import { Module } from '@nestjs/common'
import { RoleController } from './role.controller'
import { RoleService } from './role.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from '../../entities/Role'
import { Menu } from '../../entities/Menu'
import { Permission } from '../../entities/Permission'
import { UserRole } from '../../entities/UserRole'

@Module({
    imports: [TypeOrmModule.forFeature([Role, Menu, Permission, UserRole])],
    controllers: [RoleController],
    providers: [RoleService],
    exports: [RoleService],
})
export class RoleModule {}
