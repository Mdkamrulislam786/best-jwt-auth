import { verify } from "jsonwebtoken"
import { MiddlewareFn } from "type-graphql"
import { MyContext } from "./Context"

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
    // 1. grabing the data in headers sent from frontend
    const authorization = context.req.headers['authorization']
    if (!authorization) {
        throw new Error('noT authenticated')
    }

    try {
        // 2. bringing out the token from Headers
        const token = authorization.split(' ')[1]
        // 3. verifying the acces token with jwt verify method
        const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!)
        context.payload = payload as any

    } catch (err) {
        console.log(err);
        throw new Error('noT authenticated')
    }

    return next()
}



