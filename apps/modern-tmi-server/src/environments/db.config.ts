import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export type DatabaseStatus = 'local' | 'dev' | 'prod';

const dbConfig: TypeOrmModuleOptions = {
  type: 'mariadb',
  username: 'root',
  password: '1234',
  database: 'tmi',
  synchronize: true,
  autoLoadEntities: true,
};

export const setDbConfig = (status: DatabaseStatus) => {
  return Object.assign(dbConfig, {
    host: status === 'local' ? 'localhost' : 'nunch.dev',
    port: status === 'local' ? 3306 : 33067,
  });
};
