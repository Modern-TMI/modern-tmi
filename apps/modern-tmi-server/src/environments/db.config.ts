import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const dbConfig: TypeOrmModuleOptions = {
  type: 'mariadb',
  port: 33067,
  username: 'root',
  password: '1234',
  database: 'tmi',
  entities: [],
  synchronize: true,
  autoLoadEntities: true
};

export const setDbConfig = (status: 'local' | 'dev' | 'prod') => {
  Object.assign(dbConfig, {
  })
};

