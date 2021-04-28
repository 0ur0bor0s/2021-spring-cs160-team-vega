import { Arg, Int, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Product } from "./entity/mongodb/Product";
import * as child from "child_process";
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
        const searchFiltered = new RegExp(`${searchStr}`, "i");
        console.log(searchFiltered);
        var data = await getConnection("productsDBConnection")
            .getMongoRepository(Product)
            .find({
                where: {
                    product_title: {$regex: searchFiltered}
                }
        });

        // If product could not be found in database then populate database and query again
        if (data.length == 0) {  
            console.log("Searching for new products...");

            var init_cmd = new String('cd ../ecomm_crawler && cargo run --release ');
            var number = new String(' 1');
            var command = init_cmd.concat("'", searchStr, "'").concat(number.toString());
            var spawn = child.spawn;
            var cprocess = spawn(command, undefined, {shell: true, cwd: __dirname+'/../ecomm_crawler'});
    
            cprocess.stderr.on('data', (data) => {
                console.error("STDERR:", data.toString());
            });
            cprocess.stdout.on('data', (data) => {
                console.log("STDOUT:", data.toString());
            });
            cprocess.on('exit', (exitCode) => {
                console.log("Child process exited with code: " + exitCode);
            });
            
            data = await getConnection("productsDBConnection")

            .getMongoRepository(Product)
            .find({
                where: {
                    product_title: new RegExp(`^${searchStr}`, "i")
                }
            });
        }
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
}