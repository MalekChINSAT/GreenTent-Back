import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            // if our route is supplied with an expired JWT,
            // the request will be denied and a 401 Unauthorized response sent
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any) {
        // the decoded JSON as a parameter
        return { id: payload.sub, email: payload.email };
    }
}