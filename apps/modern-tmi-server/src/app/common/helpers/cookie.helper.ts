import { CookieOptions } from 'express';
import { environment } from '../../../environments/environment';
import { ONE_MINUTE } from './date.helper';

const defaultCookieOptions: () => CookieOptions = () => {
  const cookieOptions: CookieOptions = {
    domain: environment.production ? 'prod.domain.com' : 'localhost',
    httpOnly: true,
    path: '/',
    secure: true,
    maxAge: 15 * ONE_MINUTE,
  };

  return cookieOptions;
};

export const makeCookieOptions = (options?: CookieOptions) => {
  return Object.assign(defaultCookieOptions, options);
};
