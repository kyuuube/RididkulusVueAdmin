import { Injectable, NestMiddleware } from '@nestjs/common'
import { Response, NextFunction } from 'express'

@Injectable()
export class HelperMiddleware implements NestMiddleware {
    use(req: any, res: Response, next: NextFunction) {
        if (req.url === '/') {
            const token = req.csrfToken()
            res.cookie('XSRF-TOKEN', token)
            res.locals.csrfToken = token
        }
        // if (err.code === 'EBADCSRFTOKEN') {
        //     // handle CSRF token errors here
        //     res.status(403)
        //     res.json({
        //         code: 403,
        //         msg: 'invalid csrf token',
        //     })
        // }
        next()
    }
}
