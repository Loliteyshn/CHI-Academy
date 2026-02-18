import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", default: "" })
  user!: string;

  @Column({ type: "varchar", default: "" })
  email!: string;
}