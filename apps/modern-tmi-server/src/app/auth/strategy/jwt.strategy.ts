import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { environment } from '../../../environments/environment';
import { IJwtPayload } from '../types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => request?.cookies.Authentication,
      ]),
      secretOrKey: environment.JWT_ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: IJwtPayload) {
    return this.usersService.findOneById(payload.id);
  }
}
