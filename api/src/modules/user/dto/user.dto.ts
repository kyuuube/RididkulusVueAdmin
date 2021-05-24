import { IsString, IsNotEmpty, IsMobilePhone } from 'class-validator'
import { BusiErrorCode } from '../../../libs/enums/error-code-enum'

/**
 * 创建用户
 */
export class CreateUserDto {
    id?: string
    @IsNotEmpty({
        message: '姓名不能为空',
        context: { errorCode: BusiErrorCode.PARAM_ERROR },
    })
    @IsString({
        message: '姓名必须是字符串',
        context: { errorCode: BusiErrorCode.PARAM_ERROR },
    })
    readonly name: string

    @IsNotEmpty({
        message: '手机号不能为空',
        context: { errorCode: BusiErrorCode.PARAM_ERROR },
    })
    @IsMobilePhone('zh-CN')
    readonly mobile: string
    @IsNotEmpty({
        message: '密码不能为空',
        context: { errorCode: BusiErrorCode.PARAM_ERROR },
    })
    readonly password: string
    @IsNotEmpty({
        message: '邮箱不能为空',
        context: { errorCode: BusiErrorCode.PARAM_ERROR },
    })
    readonly email: string
    readonly gender?: 'male' | 'female' | 'other' | 'n/a'
    readonly avatar?: string
    public readonly roleIds?: string[]
}

/**
 * 修改用户
 */
export class EditUserDto {
    @IsNotEmpty({
        message: 'ID不能为空',
        context: { errorCode: BusiErrorCode.PARAM_ERROR },
    })
    id: string
    readonly name?: string
    readonly password?: string
    readonly gender?: 'male' | 'female' | 'other' | 'n/a'
    readonly avatar?: string
    public readonly roleIds?: string[]
}
