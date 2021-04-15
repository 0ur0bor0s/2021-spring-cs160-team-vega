import { Field, ObjectType } from "type-graphql";
import {Entity, ObjectID, ObjectIdColumn, Column, BaseEntity} from "typeorm";

@ObjectType()
@Entity("product")
export class Product extends BaseEntity {
    @Field(() => String)
    @ObjectIdColumn() 
    _id: ObjectID;

    @Field()
    @Column()
    product_title: string;

    @Field()
    @Column()
    product_desc: string;

    @Field()
    @Column()
    product_price: number;

    // will only have a product_seller_id field if the product was listed through Vega.
    @Field()
    @Column()
    product_seller_id: number;

    // @Field()
    // @Column()
    // store: string;
}
