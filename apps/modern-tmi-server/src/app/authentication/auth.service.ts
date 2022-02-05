import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../module/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/auth.dto';
import { isMatchHash } from '../common/helpers/encryption.helper';
import { environment } from '../../environments/environment';
import { makeCookieOptions } from '../common/helpers/cookie.helper';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { CreateUserDto } from '../module/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  /**
   * 유효한 사용자인지 확인한다
   * @param email
   * @param plainPassword
   */
  async validateUser(email: string, plainPassword: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (user && isMatchHash(plainPassword, user?.password)) {
      const { password, refreshToken, ...result } = user;
      return result;
    }

    return null;
  }

  /**
   * 로그인 한다
   * @param loginUser
   */
  async login(loginUser: LoginDto) {
    const user = await this.validateUser(loginUser.email, loginUser.password);

    if (!user) {
      throw new HttpException(
        '로그인에 실패하였습니다',
        HttpStatus.BAD_REQUEST
      );
    }

    const payload: IJwtPayload = {
      id: user.id,
    };

    const accessTokenCookies = this.getCookieWithAccessToken(payload);
    const refreshTokenCookies = this.getCookieWithRefreshToken(payload);

    await this.usersService.updateRefreshToken(
      user.id,
      refreshTokenCookies.refreshToken
    );

    return {
      accessTokenCookies,
      refreshTokenCookies,
      user,
    };
  }

  /**
   * 로그아웃 한다
   * @param token
   */
  async logout(token: string) {
    const { id } = this.jwtService.decode(token) as { id: number };

    await this.usersService.deleteRefreshToken(id);

    const accessTokenCookieOptions = makeCookieOptions({ maxAge: 0 });
    const refreshTokenCookieOptions = makeCookieOptions({ maxAge: 0 });

    return {
      accessTokenCookie: accessTokenCookieOptions,
      refreshTokenCookie: refreshTokenCookieOptions,
    };
  }

  /**
   * 회원가입 한다
   * @param createUserDto
   */
  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.findOneByEmail(createUserDto.email);

    if (user) {
      throw new HttpException(
        '해당 이메일로 가입된 계정이 있습니다',
        HttpStatus.BAD_REQUEST
      );
    }

    const { password, ...returnUser } = await this.usersService.createUser(
      createUserDto
    );

    return returnUser;
  }

  /**
   * Access Token과 Cookie Option을 생성한다
   * @param payload
   */
  getCookieWithAccessToken(payload: IJwtPayload) {
    const accessToken = this.jwtService.sign(payload, {
      secret: environment.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: `${environment.JWT_ACCESS_TOKEN_EXPIRATION_TIME}s`,
    });

    const cookieOptions = makeCookieOptions({
      maxAge: environment.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    });

    return {
      accessToken,
      cookieOptions,
    };
  }

  /**
   * Refresh Token과 Cookie Option을 생성한다
   * @param payload
   */
  getCookieWithRefreshToken(payload: IJwtPayload) {
    const refreshToken = this.jwtService.sign(payload, {
      secret: environment.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: `${environment.JWT_REFRESH_TOKEN_EXPIRATION_TIME}s`,
    });

    const cookieOptions = makeCookieOptions({
      maxAge: environment.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    });

    return {
      refreshToken,
      cookieOptions,
    };
  }
}
