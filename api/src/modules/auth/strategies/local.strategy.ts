import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, HttpStatus } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { BusiException } from '../../../libs/filters/busi.exception'
import { BusiErrorCode } from '../../../libs/enums/error-code-enum'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super()
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(username, password)
        if (!user) {
            throw new BusiException(
                BusiErrorCode.PWD_ERROR,
                '账号或者密码错误',
                HttpStatus.OK
            )
        }
        return user
    }
}
