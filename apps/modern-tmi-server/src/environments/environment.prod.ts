import { DatabaseStatus } from './db.config';

export const environment: {[key:string] : any, database: DatabaseStatus} = {
  production: true,
  database: 'prod',
};
