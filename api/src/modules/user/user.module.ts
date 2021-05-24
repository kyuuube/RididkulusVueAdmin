import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { StUser } from '../../entities/StUser'
import { AuthUser } from '../../entities/AuthUser'
import { UserRole } from '../../entities/UserRole'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
    imports: [TypeOrmModule.forFeature([StUser, AuthUser, UserRole])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
