import { Arg, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Product } from "./entity/mongodb/Product";

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
        return await getConnection("productsDBConnection")
            .getMongoRepository(Product)
            .find({
                where: {
                    product_title: new RegExp(`^${searchStr}`, "i")
                }
            });
    }

}