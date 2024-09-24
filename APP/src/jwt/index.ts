
import jsonwebtoken from 'jsonwebtoken'

import { injectable } from 'inversify'

import passport from 'passport'

import { Strategy, ExtractJwt } from 'passport-jwt'

@injectable()
export class JWT {

    private secret = 'ztxxs'
    private jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: this.secret
    }
    constructor() {
        this.strategy()
    }


    public createToken(data: object) {
        return jsonwebtoken.sign(data, this.secret, { expiresIn: '7d' })
    }

    public strategy() {
        const strategy = new Strategy(this.jwtOptions, (payload, done) => {
            done(null, payload)
        })
        passport.use(strategy)
    }

    static middleware() {
        return passport.authenticate('jwt', { session: false })
    }

    public init() {
        console.log('init')
        return passport.initialize()

    }



}