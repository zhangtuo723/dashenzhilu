import 'reflect-metadata'
import { InversifyExpressServer } from 'inversify-express-utils'

import { Container } from 'inversify'

import { User } from './src/user/controller'

import { UserService } from './src/user/services'
import express from 'express'

import { PrismaClient } from '@prisma/client'

import { PrismaDB } from './src/db'

import { JWT } from './src/jwt'

const container = new Container()

container.bind(User).to(User)
container.bind(UserService).to(UserService)

/**
 * 封装PrizeClient
 */

container.bind('PrismaClient').toFactory(() => {

    return () => {
        return new PrismaClient()
    }
})


container.bind(PrismaDB).to(PrismaDB)

container.bind(JWT).to(JWT)

// container.bind('JWT').toFactory(() => {
//     return () => {
//         return new JWT()
//     }
// })
// 使用工厂函数绑定 JWT
// container.bind("JWT").toFactory(() => {
//     return () => new JWT();
// });




const server = new InversifyExpressServer(container)

server.setConfig((app) => {
    container.get(JWT).init()
    app.use(express.json())
})

const app = server.build()

app.listen(3000, () => {
    console.log('stert-server:3000')
})


