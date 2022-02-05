import { ONE_DAY, ONE_MINUTE } from '../app/common/helpers/date.helper';

export interface IJwtConfig {
  JWT_ACCESS_TOKEN_SECRET: string;
  JWT_ACCESS_TOKEN_EXPIRATION_TIME: number;
  JWT_REFRESH_TOKEN_SECRET: string;
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: number;
}

export const JWT_CONFIG: IJwtConfig = {
  JWT_ACCESS_TOKEN_SECRET: 'JWT_ACCESS_TOKEN_SECRET',
  JWT_ACCESS_TOKEN_EXPIRATION_TIME: 15 * ONE_MINUTE,
  JWT_REFRESH_TOKEN_SECRET: 'JWT_REFRESH_TOKEN_SECRET',
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: 30 * ONE_DAY,
};
