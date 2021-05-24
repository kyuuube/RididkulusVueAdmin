import {
    Controller,
    Get,
    Post,
    Request,
    Response,
    UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './modules/auth/auth.service'

@Controller()
export class AppController {
    constructor(private readonly authService: AuthService) {}

    @Get('hello')
    async getHello(@Request() req) {
        // res.cookie('XSRF-TOKEN', token, {
        //     domain: 'http://admin.rosetta-latte.art',
        // })
        // res.locals.csrfToken = token
        return req.csrfToken()
    }

    // 登录
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user)
    }
}
