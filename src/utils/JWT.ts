import jwt from 'jsonwebtoken'
import { env } from '~/env.mjs';
interface Payload{
    email: string;
    id: string;
    role: "ADMIN"|"USER"
}
export class JWT {
    static createJWT(payload: Payload){
        return jwt.sign(payload,env.JWT_KEY);
    }
}