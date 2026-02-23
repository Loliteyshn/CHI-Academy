import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Users } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>
    ) { }

    async create(body: Partial<Users>) {
        const { username, password } = body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await this.usersRepository.findOne({ where: { username } })
        if (existingUser) {
            throw new BadRequestException('A user with this name already exists')
        }

        const newUser = this.usersRepository.create({ username, password: hashedPassword });
        return this.usersRepository.save(newUser);
    }

    async findUserById(id: number) {
        const user = await this.usersRepository.findOne({ where: { id } })
        return user === null ? undefined : user
    }

    async findByName(username: string) {
        const user = await this.usersRepository.findOne({ where: {username} })
        return user === null ? undefined : user
    }
}
