import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import {JwtStrategy} from "./strategies/jwt.strategy";
import {GoogleStrategy} from "./strategies/google.strategy";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
      UserModule,
      PassportModule,
      ConfigModule.forRoot(),
      JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '1d' },
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy],
  exports: [AuthService]
})
export class AuthModule {}
