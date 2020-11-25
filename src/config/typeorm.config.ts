import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  username: 'narayan',
  password: '',
  database: 'postgres',
  entities: [`${__dirname}/../**/*.entity.js`],
  synchronize: true
}