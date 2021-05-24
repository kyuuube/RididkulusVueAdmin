import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MenuController } from './menu.controller'
import { MenuService } from './menu.service'
import { Menu } from '../../entities/Menu'
import { UserRole } from '../../entities/UserRole'
import { Role } from '../../entities/Role'
import { Permission } from '../../entities/Permission'

@Module({
    controllers: [MenuController],
    imports: [TypeOrmModule.forFeature([Menu, UserRole, Role, Permission])],
    providers: [MenuService],
})
export class MenuModule {}
