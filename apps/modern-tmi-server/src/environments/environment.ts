import { DatabaseStatus } from './db.config';
import { IJwtConfig, JWT_CONFIG } from './jwt.config';

export interface IEnvironment extends IJwtConfig {
  production: boolean;
  database: DatabaseStatus;
  [key: string]: any;
}

export const environment: IEnvironment = {
  production: false,
  database: 'dev',
  ...JWT_CONFIG,
};
