import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
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
        // the decoded JSON
        
        const user = await this.userService.findOneByEmail(payload.email);
        if (!user) {
            throw new UnauthorizedException();
        }

        //this user will be injected in request object
        return {id: user.id, email: payload.email };
    }
}