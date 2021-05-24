import {
    Controller,
    Get,
    Delete,
    Body,
    Post,
    Put,
    HttpStatus,
    UseGuards,
    Query,
    Param,
} from '@nestjs/common'
import { BusiException } from '../../libs/filters/busi.exception'
import { BusiErrorCode } from '../../libs/enums/error-code-enum'
import { UserService } from './user.service'
import { CreateUserDto, EditUserDto } from './dto/user.dto'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
// import { Roles } from '../../libs/decorators/role.decorator';
// import { RolesGuard } from '../auth/guards/role.guard';
// import { UserRole } from '../../libs/enums/role-enum';
import { AuthGuard } from '@nestjs/passport'
import { QueryDto } from '../../dto/common.dto'

@Controller('user')
@ApiTags('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get('exception')
    async exception(): Promise<string> {
        // throw new BusiException(BusiErrorCode.NOT_FOUND, '缺省状态码，默认触发http 400错误');
        throw new BusiException(
            BusiErrorCode.NOT_FOUND,
            '错误：http状态正常',
            HttpStatus.OK
        )
    }

    @Post('create')
    @ApiOperation({ summary: '新增用户', deprecated: true })
    async create(@Body() user: CreateUserDto) {
        return this.userService.create(user)
    }

    @Post('create/user/v2')
    @ApiOperation({ summary: '新增用户 2.0' })
    async createUserV2(@Body() user: CreateUserDto) {
        return this.userService.createUser(user)
    }

    @Get('list')
    @ApiOperation({ summary: '用户列表' })
    async userList(@Query() params: QueryDto) {
        return this.userService.getUserList(params)
    }

    @Delete('/:id')
    @ApiOperation({ summary: '删除用户' })
    async deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(id)
    }

    @Get('/:id')
    @ApiOperation({ summary: '用户详情' })
    async userDetail(@Param('id') id: string) {
        console.log(id)
        return this.userService.userDetail(id)
    }

    @Put('/')
    @ApiOperation({ summary: '修改用户' })
    async editUser(@Body() user: EditUserDto) {
        return this.userService.editUser(user)
    }
}
