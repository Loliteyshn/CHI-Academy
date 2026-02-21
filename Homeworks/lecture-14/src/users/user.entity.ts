import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude, Expose } from 'class-transformer'
import { Exhibits } from "../exhibits/exhibits.entity";
import { Comments } from "../comments/comments.entity";

@Entity()
export class Users {
    @Expose()
    @PrimaryGeneratedColumn()
    id!: number

    @Expose()
    @Column({ unique: true })
    username!: string

    @Exclude()
    @Column()
    password!: string

    @Exclude()
    @Column({ default: false })
    isAdmin!: boolean

    @Expose()
    @OneToMany(() => Exhibits, (exhibit) => exhibit.user, { cascade: true })
    exhibits!: Exhibits[]

    @Expose()
    @OneToMany(() => Comments, (comment) => comment.user)
    comments!: Comments[];
}