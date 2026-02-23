import { Expose } from "class-transformer";
import { Exhibits } from "../exhibits/exhibits.entity";
import { Users } from "../users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comments {
    @Expose()
    @PrimaryGeneratedColumn()
    id!: number;

    @Expose()
    @Column()
    text!: string;

    @Expose()
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Expose()
    @ManyToOne(() => Users, user => user.comments, { eager: true })
    user!: Users;

    @ManyToOne(() => Exhibits, exhibit => exhibit.comments, { eager: true })
    exhibit!: Exhibits;
}
