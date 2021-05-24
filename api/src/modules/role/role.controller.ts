import {
    Controller,
    Logger,
    UseGuards,
    Get,
    Query,
    Post,
    Body,
    Delete,
    Param,
    Put,
} from '@nestjs/common'
import { RoleService } from './role.service'
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { CreateRoleDto } from './dto/role.dto'
import { QueryDto } from '../../dto/common.dto'
import { AuthGuard } from '@nestjs/passport'

@Controller('role')
@ApiTags('role')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class RoleController {
    private logger = new Logger('api-gateway')
    constructor(private readonly roleService: RoleService) {}

    @Get('/list')
    @ApiOperation({ summary: '获取角色列表' })
    public getRoleList(@Query() params: QueryDto) {
        return this.roleService.getRoleList(params)
    }

    @Post('/create')
    @ApiOperation({ summary: '创建角色' })
    public createRole(@Body() params: CreateRoleDto) {
        return this.roleService.createRole(params)
    }

    @Put('/edit')
    @ApiOperation({ summary: '修改角色' })
    public editRole(@Body() params: CreateRoleDto) {
        return this.roleService.editRole(params)
    }

    @Delete('/delete/:id')
    @ApiOperation({ summary: '删除角色' })
    public deleteRole(@Param('id') id: string) {
        return this.roleService.deleteRole(id)
    }

    @Get('/detail/:id')
    @ApiOperation({ summary: '查看角色详情' })
    public roleInfo(@Param('id') id: string) {
        return this.roleService.roleInfo(id)
    }

    @Get('/options')
    @ApiOperation({ summary: '获取角色列表' })
    public getRoles() {
        return this.roleService.roleAllList()
    }
}
