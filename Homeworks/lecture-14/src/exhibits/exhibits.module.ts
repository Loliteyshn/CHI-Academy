import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Exhibits } from "./exhibits.entity";
import { ExhibitController } from "./exhibits.controller";
import { ExhibitService } from "./exhibits.service";
import { Users } from "src/users/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Exhibits, Users])],
    controllers: [ExhibitController],
    providers: [ExhibitService],
    exports: [ExhibitService]
})
export class ExhibitModule { }