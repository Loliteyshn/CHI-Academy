import { Service } from "typedi";
import { AppDataSource } from "../data-source/data-source";
import { Users } from "../entities/Users";

@Service()
export class UserService {
    getAll() {
        return AppDataSource.getRepository(Users).find();
    }

    create(user: Partial<Users>) {
        const newUser = AppDataSource.getRepository(Users).create(user)
        AppDataSource.getRepository(Users).save(newUser)
        return newUser;
    }

    async update(id: number, body: Partial<Users>) {
        const user = await AppDataSource.getRepository(Users).findOneBy({ id });
        if (!user) {
            throw new Error("User not found");
        }

        AppDataSource.getRepository(Users).merge(user, body);
        return AppDataSource.getRepository(Users).save(user);
    }

    delete(id: number) {
        return AppDataSource.getRepository(Users).delete(id)
    }
}