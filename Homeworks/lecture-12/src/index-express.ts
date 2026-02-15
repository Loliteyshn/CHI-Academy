import bodyParser from 'body-parser'
import express from 'express'
import fs from 'fs'

const app = express()
const port = 3000

app.use(bodyParser.json())

interface UserType { id: number, email: string, user: string }

const readUsers = () => {
    const data = fs.readFileSync('./data/users.json', 'utf-8');
    return JSON.parse(data);
}

const saveUsers = (users: Array<UserType>) => {
    fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 2));
};

app.get('/', (req, res) => {
    res.send({ author: 'Lolita Golovach' })
})

app.get('/users', (req, res) => {
    const data = readUsers();
    res.send(data);
});

app.post('/users', (req, res) => {
    const { user, email } = req.body;
    const users = readUsers();

    const newUser = {
        id: Date.now(),
        user, email
    };

    users.push(newUser);
    saveUsers(users);
    res.send('User created successfully');
})

app.patch('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const body = req.body
    const users = readUsers();

    const index = users.findIndex((user: UserType) => user.id === id);
    if (index === -1) return res.status(404).json({ error: 'User not found' });

    users[index] = { ...users[index], ...body }

    saveUsers(users);
    res.send(`User changed successfully ${users[index]} `)
})

app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const users = readUsers();

    const filteredUsers = users.filter((user: UserType) => user.id !== id);
    
    saveUsers(filteredUsers);
    res.send(`User deleted successfully`);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
