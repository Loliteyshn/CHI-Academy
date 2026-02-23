import { DataSource } from 'typeorm'
import { Users } from './users/user.entity'
import { Exhibits } from './exhibits/exhibits.entity'
import { Comments } from './comments/comments.entity'

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'museum',
    password: 'museum',
    database: 'museum_db',
    synchronize: false,
    entities: [__dirname + '/**/*.entity.{ts,js}'],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
})