import { sign } from "jsonwebtoken";
import { User } from "./entity/User";


export const craeteAccessToken = (user: User) => {
    return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '15m' })
}

export const craeteRefreshToken = (user: User) => {
    return sign({ userId: user.id, tokenVersion: user.tokenVersion }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' })
}
