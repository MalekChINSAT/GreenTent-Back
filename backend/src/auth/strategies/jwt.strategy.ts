import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from 'src/auth/auth.service';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            // if our route is supplied with an expired JWT,
            // the request will be denied and a 401 Unauthorized response sent
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any) {
        //the payload of the jsonwebtoken
        // the decoded JSON as a parameter
        //this user will be injected in request object
        //const user = this.authService.validateUser(payload.email);
        const user ={ id: payload.email, sub: payload.sub}
        return user;
    }
}