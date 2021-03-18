import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";


@ObjectType()
@Entity('users')
export class User extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column("text")
    email: string;

    @Column("text")
    password: string;

    @Column("int", { default: 0 })
    tokenVersion: string;

}

//ADD USER REQ
// mutation {
//     register(email: "kamrul@gmail.com", password: "bob")
// }

//GET USERS
// {
//     users{
//         id
//         email
//     }
// }

//LOGIN
// mutation{
//     login(email: "kamrul@gmail.com", password: "bob"){
//         accecssToken
//     }
// }