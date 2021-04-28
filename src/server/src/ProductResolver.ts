import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Product } from "./entity/mongodb/Product";
import { User } from "./entity/mysql/User";
// import { UserResolver } from "./UserResolver";


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
    async getProductsByProductName(
        @Arg('searchStr', () => String) searchStr: string
    ) {
        console.log(searchStr);
        const data =  await getConnection("productsDBConnection")
            .getMongoRepository(Product)
            .find({
                where: {
                    product_title: new RegExp(`^${searchStr}`, "i")
                }
            });
            console.log(data);
            return data;
    }


    @Query(() => [Product])
    async getProductsBySellerId(
        @Arg('product_seller_id', () => Int) product_seller_id: number     
    ) {
        return await getConnection("productsDBConnection")
            .getMongoRepository(Product)
            .find({
                where: {
                    product_seller_id: product_seller_id
                }
            });
    }


    @Query(() => [Product])
    async getProductsBySellerUsername(
        @Arg('username', () => String) username: string
    ) {

        // connects to mysql (user) database to get ID associated to the specified username. 
        // this should be replaced with using the 'getUserByUsername' query in UserResolver (current block is copied).
        //  - import UserResolver, create instance, use the query
        const user = await getConnection("usersDBConnection")
            .getRepository(User)
            .findOne({
                where: {
                    username: username
                }
            });
        console.log(user);
        const data = await getConnection("productsDBConnection")
            .getMongoRepository(Product)
            .find({
                where: {
                    product_seller_id: user!.id
                }
            });
        console.log(data);
        return data;
    }

    @Query(() => [Product])
    async getProductByProductId (
        @Arg('_id', () => String) _id: string
    ) {
        const data =  await getConnection("productsDBConnection")
            .getMongoRepository(Product)
            .find({
                where: {
                    _id: _id
                }
            });
        console.log(data);
        return data;
    }

    @Mutation(() => Boolean) 
    async createNewProduct(
        @Arg('_id') _id: string,
        @Arg('product_title') product_title: string,
        @Arg('product_desc') product_desc: string,
        @Arg('product_price') product_price: number,
        @Arg('product_seller_id') product_seller_id: number,
    ) {
        console.log("we got to the backend!!!");
        const productRepository = getConnection("productsDBConnection").getRepository(Product);

        try {
            await productRepository.insert(
                {
                    _id, 
                    product_title, 
                    product_desc, 
                    product_price,
                    product_seller_id
                });

        } catch(err) {
            console.log(err);
            return false;
        }

        return true;
    }

    
}
