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
    Request,
} from '@nestjs/common'
import { MenuService } from './menu.service'
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { MenuDto } from './dto/menu.dto'
import { QueryDto } from '../../dto/common.dto'
import { AuthGuard } from '@nestjs/passport'

@Controller('menu')
@ApiTags('menu')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class MenuController {
    private logger = new Logger('api-gateway')
    constructor(private readonly menuService: MenuService) {}

    @Post('/create')
    @ApiOperation({ summary: '创建菜单' })
    public createMenu(@Body() dto: MenuDto) {
        return this.menuService.createMenu(dto)
    }

    @Put('/edit')
    @ApiOperation({ summary: '修改菜单' })
    public editMenu(@Body() dto: MenuDto) {
        return this.menuService.editMenu(dto)
    }

    @Delete('/delete/:id')
    @ApiOperation({ summary: '删除菜单' })
    public deleteMenu(@Param('id') id: string) {
        return this.menuService.deleteMenu(id)
    }

    @Get('/list')
    @ApiOperation({ summary: '获取菜单列表' })
    public getMenuList(@Query() params: QueryDto) {
        return this.menuService.menuList(params)
    }

    @Get('/authority')
    @ApiOperation({ summary: '获取菜单权限树' })
    public getMenus() {
        return this.menuService.authority()
    }

    @Get('/detail/:id')
    @ApiOperation({ summary: '获取菜单详情' })
    public getMenuDetail(@Param('id') id: string) {
        return this.menuService.menuDetail(id)
    }

    @Get('/tree')
    @ApiOperation({ summary: '获取菜单树' })
    public getMenuTree() {
        return this.menuService.menuTree()
    }

    @Get('/user/tree')
    @ApiOperation({ summary: '获取当前用户菜单树' })
    public getCurrentMenuTree(@Request() req) {
        return this.menuService.getMenu(req.user)
    }
}
