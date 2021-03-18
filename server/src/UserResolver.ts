import { compare, hash } from 'bcryptjs'
import { craeteRefreshToken, craeteAccessToken } from './auth'
import { Resolver, Query, Mutation, Arg, Field, ObjectType, Ctx, UseMiddleware, Int } from 'type-graphql'
import { MyContext } from './Context'
import { User } from './entity/User'
import { isAuth } from './isAuth'
import { sendRefreshToken } from './sendRefreshToken'
import { getConnection } from 'typeorm'


@ObjectType()
class LoginResponse {
    @Field()
    accecssToken: string
}

@Resolver()
export class UserResolver {
    @Query(() => String)
    hello() {
        return 'hi!'
    }

    @Query(() => String)
    @UseMiddleware(isAuth)
    bye(@Ctx() { payload }: MyContext) {
        console.log(payload);
        return `your user id is ${payload!.userId} `
    }

    @Query(() => [User])
    users() {
        return User.find()
    }

    @Mutation(() => Boolean)
    async revokeRefreshTokenForUser(@Arg("userId", () => Int) userId: number) {
        await getConnection().getRepository(User).increment({ id: userId }, "tokenVersion", 1)
        return true
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() { res }: MyContext
    ): Promise<LoginResponse> {
        const user = await User.findOne({ where: { email } })
        if (!user) {
            throw new Error('could not find user')
        }

        const valid = await compare(password, user.password)
        if (!valid) {
            throw new Error('bad password')
        }

        //login successful
        //make cookie, put diff secret instead of acccessToken
        sendRefreshToken(res, craeteRefreshToken(user))
        return {
            accecssToken: craeteAccessToken(user)
        }
    }

    @Mutation(() => Boolean)
    async register(
        @Arg("email") email: string,
        @Arg("password") password: string
    ) {
        const hashedPassword = await hash(password, 12);

        try {
            await User.insert({
                email,
                password: hashedPassword
            });
        } catch (err) {
            console.log(err);
            return false;
        }

        return true;
    }

}