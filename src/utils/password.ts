import bcrypt from 'bcrypt'
export class Password {
    static hashPassword(password: string): string{
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password,salt)
        return hashedPassword
    }
    static comparePasswords(password:string,hash:string): boolean{
        const isMatch = bcrypt.compareSync(password,hash)
        return isMatch
    }
}

