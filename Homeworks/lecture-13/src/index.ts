import 'reflect-metadata'
import { createExpressServer, useContainer } from 'routing-controllers'
import { UserController } from './controllers/UserController';
import { MainController } from './controllers/MainController';
import { Container } from 'typedi'
import { AppDataSource } from './data-source/data-source';

useContainer(Container)

const app = createExpressServer({
    controllers: [MainController, UserController],
    validation: true,
})

const initializeDatabase = async () => {
    await AppDataSource.initialize();
}

initializeDatabase();

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})