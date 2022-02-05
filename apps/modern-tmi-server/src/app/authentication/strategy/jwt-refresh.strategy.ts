import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../module/users/users.service';
import { environment } from '../../../environments/environment';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh'
) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => request?.cookies.Refresh,
      ]),
      secretOrKey: environment.JWT_REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req, payload: IJwtPayload) {
    const refreshToken = req.cookies?.Refresh;
    return this.usersService.checkMatchRefreshToken(payload.id, refreshToken);
  }
}
