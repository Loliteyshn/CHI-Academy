import { Service } from "typedi";
import { readFileSync, writeFileSync } from "fs";

@Service()
export class UserService {
    private readUsers() {
        const data = readFileSync('./data/users.json', 'utf-8');
        return JSON.parse(data);
    }

    private saveUsers(users: any) {
        writeFileSync('./data/users.json', JSON.stringify(users, null, 2));
    };

    getAll() {
        return this.readUsers();
    }

    create(user: { email: string, user: string }) {
        const users = this.readUsers();
        const newUser = { id: Date.now(), ...user };
        users.push(newUser);
        this.saveUsers(users);
        return newUser;
    }

    update(id: number, user: any) {
        const users = this.readUsers();
        const index = users.findIndex((u: { id: number }) => u.id === id);
        if (index === -1) return null;

        users[index] = { ...users[index], ...user }

        this.saveUsers(users);
        return users[index]
    }

    delete(id: number) {
        const users = this.readUsers();
        const filteredUsers = users.filter((u: { id: number }) => u.id !== id);
        this.saveUsers(filteredUsers);
        return { message: 'User deleted successfully' }
    }
}