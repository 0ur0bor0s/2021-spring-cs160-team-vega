import { sign } from "jsonwebtoken";
import { User } from "./entity/mysql/User";

//We add the ! after the env variable b/c typescript doesn't know if that variable is actually defined
//By adding the ! we're telling typescript that it will always be defined
export const createAccessToken = (user: User) => {
    return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: '15m'
    })
}

export const createRefreshToken = (user: User) => {
    return sign(
        { userId: user.id, tokenVersion: user.tokenVersion }, 
        process.env.REFRESH_TOKEN_SECRET!, 
        {
            expiresIn: '7d'
        }
    )
}