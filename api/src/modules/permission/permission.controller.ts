import {
    Controller,
    Get,
    Logger,
    Post,
    Body,
    UseGuards,
    Param,
    Put,
    Delete,
    Query,
} from '@nestjs/common'
import { PermissionService } from './permission.service'
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { PermissionDto } from './dto/permissions.dto'
import { AuthGuard } from '@nestjs/passport'
import { QueryDto } from '../../dto/common.dto'

@Controller('permission')
@ApiTags('permission')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class PermissionController {
    private logger = new Logger('api-gateway')
    constructor(private readonly permissionService: PermissionService) {}

    @Post('/create')
    @ApiOperation({ summary: '创建权限' })
    public createMenu(@Body() dto: PermissionDto) {
        return this.permissionService.createPerm(dto)
    }

    @Put('/edit')
    @ApiOperation({ summary: '修改权限' })
    public editPerm(@Body() dto: PermissionDto) {
        return this.permissionService.editPerm(dto)
    }

    @Delete('/delete/:id')
    @ApiOperation({ summary: '删除权限' })
    public deletePerm(@Param('id') id: string) {
        return this.permissionService.deletePerm(id)
    }

    @Get('/list')
    @ApiOperation({ summary: '获取权限列表' })
    public getPermList(@Query() params: QueryDto) {
        return this.permissionService.permList(params)
    }

    @Get('/detail/:id')
    @ApiOperation({ summary: '获取权限详情' })
    public getPermDetail(@Param('id') id: string) {
        return this.permissionService.permDetail(id)
    }
}
