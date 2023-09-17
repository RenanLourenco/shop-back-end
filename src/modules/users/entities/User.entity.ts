import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role.entity";

@Entity({name:'users'})
export class User {

    @PrimaryGeneratedColumn()
    id: number


    @Column({nullable:false})
    name: string

    
    @Column({nullable:false})
    password: string


    @Column({nullable:false})
    email:string

    @ManyToOne(() => Role, (role) => role.users)
    role: Role


}