import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
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
    async getTwentyProducts() {
        return await getConnection("productsDBConnection")
            .getMongoRepository(Product)
            .find({take:20})
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
        return await getConnection("productsDBConnection")
            .getMongoRepository(Product)
            .find({
            // .findOne({
                where: {
                    _id: _id
                }
            });

    }


    @Mutation(() => Boolean) 
    async createNewProduct(
        @Arg('_id') _id: string,
        @Arg('product_title') product_title: string,
        @Arg('product_desc') product_desc: string,
        @Arg('product_price') product_price: number,
        @Arg('product_seller_id') product_seller_id: number,
    ) {
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


    // Refactor using Product as arg
    @Mutation(() => Boolean)
    async updateProductListing(
        @Arg('product_id') product_id: string,
        @Arg('product_title') product_title: string,
        @Arg('product_desc') product_desc: string,
        @Arg('product_price') product_price: number,
    ) {
        const productRepository = getConnection("productsDBConnection").getRepository(Product);
        console.log(`updating doc with id ${product_id}`);
        try{
            // const oid = ObjectIdColumn(_id);
            const oldProductListing = await productRepository.findOne({ where: {product_id: product_id} });
            // const OldProductListing  = this.getProductByProductId(_id: _id) { _id }
            console.log(oldProductListing);
            // console.log(await productRepository.findOne({where: {_id: ObjectIdColumn(_id)}}));
            await productRepository.update({ product_id: product_id},
                {
                    product_title: product_title,
                    product_desc: product_desc,
                    product_price: product_price
                    // $set: {
                    //     product_title,
                    //     product_desc,
                    //     product_price
                    // }
                }
            );
            const updatedProductListing = await  productRepository.findOne({where: {product_id: product_id}});
            console.log(updatedProductListing);
            
        } catch(err) {
            console.log(err);
            return false;
        }
        console.log("doc updated")
        return true;
    }
    
}