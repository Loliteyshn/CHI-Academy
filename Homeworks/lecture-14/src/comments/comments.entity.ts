import { Exhibits } from "../exhibits/exhibits.entity";
import { Users } from "../users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comments {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    text!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @ManyToOne(() => Users, user => user.comments, { eager: true })
    user!: Users;

    @Column()
    userId!: number;

    @ManyToOne(() => Exhibits, exhibit => exhibit.comments, { eager: true })
    exhibit!: Exhibits;

    @Column()
    exhibitId!: number;
}
