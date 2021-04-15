import { Field, ObjectType, Int } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

/*
GENERAL NOTE:
Field() allows us to access certain class fields
*/

//Users is the name of the table
//Using objecttype allows us to use the User object as a type
@ObjectType()
@Entity("users")
export class User extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    email: string;

    @Column()
    password: string;

    @Column("int", { default: 0 })
    tokenVersion: number;
}
