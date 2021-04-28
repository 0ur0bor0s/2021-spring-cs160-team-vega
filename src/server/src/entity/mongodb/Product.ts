import { Field, ObjectType } from "type-graphql";
import {Entity, ObjectID, ObjectIdColumn, Column, BaseEntity} from "typeorm";

@ObjectType()
@Entity()
export class Product extends BaseEntity {
    @Field(() => String)
    @ObjectIdColumn() 
    _id: ObjectID;

    @Field()
    @Column()
    buy_link: string;

    @Field()
    @Column()
    product_title: string;

    @Field()
    @Column()
    product_desc: string;

    @Field()
    @Column()
    product_price: number;

    @Field()
    @Column()
    product_seller_id: number;

    @Field()
    @Column()
    img_link: string;
}
