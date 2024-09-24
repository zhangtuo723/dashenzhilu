
import { inject, injectable } from 'inversify'
import { PrismaDB } from '../db'
import { UserDto } from './user.dto'

import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { JWT } from '../jwt'

@injectable()
export class UserService {

    constructor(
        @inject(PrismaDB) private readonly PrismaDB: PrismaDB,
        @inject(JWT) private readonly jwt: JWT

    ) {


    }

    public async getList() {
        return await this.PrismaDB.prisma.user.findMany()
    }


    public async createUser(user: UserDto) {

        let userDto = plainToClass(UserDto, user)
        const errors = await validate(userDto)
        console.log(errors)

        if (errors.length) {
            return errors
        } else {
            const result = await this.PrismaDB.prisma.user.create({ data: user })
            return {
                ...result,
                token: this.jwt.createToken(result)
            }
        }


    }

}