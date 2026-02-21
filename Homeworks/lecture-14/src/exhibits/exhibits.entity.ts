import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Expose } from 'class-transformer';
import { Users } from "../users/user.entity";
import { Comments } from "../comments/comments.entity";

@Entity()
export class Exhibits {
    @Expose()
    @PrimaryGeneratedColumn()
    id!: number

    @Expose()
    @Column()
    description!: string

    @Expose()
    @Column()
    imageUrl!: string

    @Expose()
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Expose()
    @ManyToOne(() => Users, (user) => user.exhibits, { eager: true })
    @JoinColumn({ name: 'userId' })
    user!: Users

    @Expose()
    @Column()
    userId!: number;

    @Expose()
    @OneToMany(() => Comments, comment => comment.exhibit)
    comments!: Comments[];
}
