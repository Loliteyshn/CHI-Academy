import { createExpressServer, useContainer } from 'routing-controllers'
import { UserController } from './controllers/UserController';
import { MainController } from './controllers/MainController';
import { Container } from 'typedi'

useContainer(Container)

const app = createExpressServer({
    controllers: [MainController, UserController],
    validation: true,
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})