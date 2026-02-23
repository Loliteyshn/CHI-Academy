import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/users/user.entity";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { Exhibits } from "src/exhibits/exhibits.entity";
import { Comments } from "./comments.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Comments, Exhibits, Users])],
    controllers: [CommentController],
    providers: [CommentService],
    exports: [CommentService]
})
export class CommentModule { }