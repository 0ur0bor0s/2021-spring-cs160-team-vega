import { getConnection, ObjectID } from "typeorm";
import { Product } from "./entity/mongodb/Product";

//Deletes Product with given id from mongodb database
export const deleteListing = async (product_id: ObjectID) => {
    try {
        await getConnection("productDBConnection").getMongoRepository(Product).delete({ _id: product_id });
        console.log("Deleted product with id: " + product_id);
    } catch (error) {
        console.log("Unable to delete product with id: " + product_id);
    }
}