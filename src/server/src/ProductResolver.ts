import { Arg, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Product } from "./entity/mongodb/Product";
import * as child from 'child_process';

@Resolver()
export class ProductResolver {
    
    @Query(() => [Product])
    async products() {
        const result = await getConnection("productsDBConnection")
            .getMongoRepository(Product)
            .find();

        return result;
    }

    @Query(() => [Product])
    async getProducts(
        @Arg('searchStr', () => String) searchStr: string
    ) {
        var products = await getConnection("productsDBConnection")
            .getMongoRepository(Product)
            .find({
                where: {
                    product_title: new RegExp(`^${searchStr}`, "i")
                }
        });

        // If product could not be found in database then populate database and query again
        if (products == null) {  

            var init_cmd = new String('cd ../ecomm_crawler && cargo run --release ');
            var number = new String(' 5');
            var command = init_cmd.concat(searchStr).concat(number.toString());
            child.exec(command);
            
            products = await getConnection("productsDBConnection")
            .getMongoRepository(Product)
            .find({
                where: {
                    product_title: new RegExp(`^${searchStr}`, "i")
                }
            });
        }

        return products;
    }

}