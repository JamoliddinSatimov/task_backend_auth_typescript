import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm"

@Entity({
    name: 'users'
})

export class Users {
    
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        type: "varchar",
        length: 32,
        nullable: false
    })
    first_name: string

    @Column({
        type: "varchar",
        length: 32,
        nullable: false
    })
    last_name: string

    @Column({
        type: "varchar",
        length: 32,
        nullable: false,
        unique:true
    })
    username: string

    @Column({
        type: "varchar",
        length: 256,
        nullable: false
    })
    password: string


}