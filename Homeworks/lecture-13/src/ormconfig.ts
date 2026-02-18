import { DataSource } from 'typeorm'
import { Users } from './entities/Users'

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'museum',
    password: 'museum',
    database: 'museum',
    migrations: ['./src/migrations/*.ts'],
    synchronize: false,
    entities: [
        Users,
        __dirname + "/entities/**/*.entity.ts"
    ]
})