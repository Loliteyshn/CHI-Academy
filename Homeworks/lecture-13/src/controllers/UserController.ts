import "reflect-metadata";
import { Body, Delete, Get, JsonController, Param, Patch, Post, Put } from "routing-controllers";
import { CreateUser } from "../validators/CreateUser";
import { UserService } from "../services/UserService";
import { UpdateUser } from "../validators/UpdateUser";
import { Service } from "typedi";

@Service()
@JsonController('/users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('/')
    getAll() {
        return this.userService.getAll();
    }

    @Post('/')
    createUser(@Body() body: CreateUser) {
        return this.userService.create(body)
    }

    @Patch('/:id')
    update(@Param('id') id: number, @Body() body: UpdateUser) {
        return this.userService.update(id, body);
    }

    @Delete('/:id') 
    delete(@Param('id') id: number) {
        return this.userService.delete(id)
    }
}