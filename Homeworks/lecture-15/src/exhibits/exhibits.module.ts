import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Exhibits } from "./exhibits.entity";
import { ExhibitController } from "./exhibits.controller";
import { ExhibitService } from "./exhibits.service";
import { Users } from "src/users/user.entity";
import { Comments } from "src/comments/comments.entity";
import { NotificationsGateway } from "src/notifications/notifications.gateway";

@Module({
    imports: [TypeOrmModule.forFeature([Exhibits, Users, Comments])],
    controllers: [ExhibitController],
    providers: [ExhibitService, NotificationsGateway],
    exports: [ExhibitService]
})
export class ExhibitModule { }