import { JWT_CONFIG } from './jwt.config';
import { IEnvironment } from './environment';

export const environment: IEnvironment = {
  production: true,
  database: 'prod',
  ...JWT_CONFIG,
};
