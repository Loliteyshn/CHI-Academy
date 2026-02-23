import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/users/users.service";
import * as bcrypt from 'bcrypt';
import { Users } from "src/users/user.entity";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string) {
        const user = await this.userService.findByName(username);

        if (!user) {
            throw new UnauthorizedException();
        }

        if (user && (await this.comparePasswords(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }

        throw new UnauthorizedException('The data is incorrect');
    }

    async login(user: { username: string, id: number }) {
        const payload = { username: user.username, sub: user.id };

        const accessToken = this.jwtService.sign(payload, { expiresIn: '30d' });
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }

    private async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
}