import { Module } from "@nestjs/common";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./user.entity";
import { Exhibits } from "src/exhibits/exhibits.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Users, Exhibits])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule { }