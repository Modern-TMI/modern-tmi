import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/users.dto';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { User } from '../users/users.entity';

@Controller('auth')
@ApiTags('로그인 / 회원가입 API')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { accessTokenCookies, refreshTokenCookies, user } =
      await this.authService.login(loginDto);

    res.cookie(
      'Authentication',
      accessTokenCookies.accessToken,
      accessTokenCookies.cookieOptions
    );
    res.cookie(
      'Refresh',
      refreshTokenCookies.refreshToken,
      refreshTokenCookies.cookieOptions
    );

    return user;
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const token = req.cookies.Authentication || req.cookies.Refresh;
    if (!token) {
      throw new HttpException(
        '현재 로그인된 계정이 없습니다',
        HttpStatus.BAD_REQUEST
      );
    }
    const { accessTokenCookie, refreshTokenCookie } =
      await this.authService.logout(token);
    res.cookie('Authentication', '', accessTokenCookie);
    res.cookie('Refresh', '', refreshTokenCookie);

    return true;
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const user: User = req.user as User;

    const { accessToken, cookieOptions } =
      this.authService.getCookieWithAccessToken({
        id: user.id,
      });

    res.cookie('Authentication', accessToken, cookieOptions);
    return user;
  }
}
