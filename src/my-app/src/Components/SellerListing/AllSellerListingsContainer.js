import React, { useEffect, useState } from "react";
import {useQuery} from "graphql-hooks";
// import IndivSellerListingContainer from "./SellerListingContainer";
import SellerListingCard from "./SellerListingCard";
// import EditListingInfoPopUp from "./EditListingModal";
import Styles from "./SellerListing.module.css";
import { GET_PRODUCTS_BY_SELLER_USERNAME_QUERY, GET_PRODUCTS_BY_SELLER_ID_QUERY } from "../../graphql/product";
import { v4 as uuidv4 } from "uuid";    // temp


const AllSellerListingsContainer = () => {

/***********************************/

    // const [sellerUsername, setSellerUsername] = useState('jalend'); // replace 'jalend' with the fetched userame from api response
    // const [products, setProducts] = useState([]);

    // console.log('render');

    // useEffect(() => {
        
    //     // const response = await fetch('');   // uri from search for products by user request
    //     // const data 
    // }, [sellerUsername]);


/***********************************/

    const [sellerUsername, setSellerUsername] = useState('user1');  // should take arg of searched name
    const productResponse = GET_PRODUCTS_BY_SELLER_USERNAME_QUERY(sellerUsername);  // should take arg of searched name
    console.log("seller username: " + sellerUsername);
    console.log("initial products loaded: " + productResponse.data);    // *need to better understand this*


    // *need to better understand this*
    useEffect(() => {
        console.log("a seller's product list must have changed..");
    }, [productResponse.getProductsBySellerUsername]);


    if (productResponse.error) console.log('There was a problem with GET_PRODUCTS_BY_SELLER_USERNAME_QUERY');
    if (productResponse.loading) return <div>Loading...</div>;

    return (
        <div>
            {/* Each of product's properties is passed as a prop to SellerListingCard */}
            <h1>Your listed items</h1>
            <div className={Styles.listedItemsContainer}>
                {/*} {(useGetProductsBySellerUsernameQuery).map(product => { */}
                {!productResponse.data ? <text>You have not listed any items.</text> : productResponse.data.getProductsBySellerUsername.map(product => { 
                    return (
                        // <div className={Styles.listing}>
                            <SellerListingCard 
                                title={product.product_title}
                                price={product.product_price}
                                description={product.product_desc}

                                /*
                                    TO DO:
                                        - figure out if images will be in db.   
                                */

                                // images={product.images}
                                product_id={product.product_id}
                            />
                        // </div>
                    );
                })}
            </div>
        </div>            
    );
    
};
export default AllSellerListingsContainer;