import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";

@Entity({name:'roles'})
export class Role {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name: string

    @Column()
    description:string

    @OneToMany(() => User, (user) => user.role)
    users: User[]

}