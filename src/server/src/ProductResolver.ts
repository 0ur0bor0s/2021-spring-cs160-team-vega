import { Arg, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Product } from "./entity/mongodb/Product";
import * as child from "child_process";

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
        const searchFiltered = new RegExp(`${searchStr}`, "i");
        console.log(searchFiltered);
        var products = await getConnection("productsDBConnection")
            .getMongoRepository(Product)
            .find({
                where: {
                    product_title: {$regex: searchFiltered}
                }
        });

        // If product could not be found in database then populate database and query again
        if (products.length == 0) {  
            console.log("Searching for new products...");

            var init_cmd = new String('cd ../ecomm_crawler && cargo run --release ');
            var number = new String(' 1');
            var command = init_cmd.concat(searchStr).concat(number.toString());
            var spawn = child.spawn;
            var cprocess = spawn(command, undefined, {shell: true, cwd: __dirname+'/../ecomm_crawler'});
    
            cprocess.stderr.on('data', function (data) {
                console.error("STDERR:", data.toString());
            });
            cprocess.stdout.on('data', function (data) {
                console.log("STDOUT:", data.toString());
            });
            cprocess.on('exit', (exitCode) => {
                console.log("Child process exited with code: " + exitCode);
            });
            
            products = await getConnection("productsDBConnection")
            .getMongoRepository(Product)
            .find({
                where: {
                    product_title: new RegExp(`^${searchStr}`, "i")
                }
            });
        }
        console.log(products);
        return products;
    }

}