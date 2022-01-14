import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export type DatabaseStatus = 'local' | 'dev' | 'prod';

const dbConfig: TypeOrmModuleOptions = {
  type: 'mariadb',
  username: 'root',
  password: '1234',
  database: 'tmi',
  entities: [],
  synchronize: true,
  autoLoadEntities: true,
};

export const setDbConfig = (status: DatabaseStatus) => {
  const customOptions: TypeOrmModuleOptions = {
    host: status === 'local' ? 'localhost' : 'nunch.dev',
    port: status === 'local' ? 3306 : 33067,
    logging: status === 'local' || status === 'dev',
  };
  return Object.assign(dbConfig, customOptions);
};
