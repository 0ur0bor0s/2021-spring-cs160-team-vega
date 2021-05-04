import React, { useEffect, useState } from "react";
import {useQuery} from "graphql-hooks";
// import IndivSellerListingContainer from "./SellerListingContainer";
import MyListingCard from "../Components/SellerListing/MyListingCard";
// import EditListingInfoPopUp from "./EditListingModal";
import Styles from "../Components/SellerListing/MyListings.module.css";
import Header from "../Components/Header"
import { GET_PRODUCTS_BY_SELLER_USERNAME_QUERY, GET_PRODUCTS_BY_SELLER_ID_QUERY } from "../graphql/product";
import { v4 as uuidv4 } from "uuid";    // temp


const MyListings = props => {

    /* TODO: Check if user is logged in, if not prompt them to login. */
    /* Get username token and use for useState sellerUsername. */


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
            <Header history={props.history}/>
            <div>
                {/* Each of product's properties is passed as a prop to SellerListingCard */}
                <h1><center>Your listed items</center></h1>
                <div className={Styles.listedItemsContainer}>
                    {!productResponse.data ? <text>You have not listed any items.</text> : productResponse.data.getProductsBySellerUsername.map(product => { 
                        return (
                            <MyListingCard 
                                title={product.product_title}
                                price={product.product_price}
                                description={product.product_desc}
                                images={product.images}
                                product_id={product.product_id}
                            />
                        );
                    })}
                </div>
            </div>
        </div>            
    );   
};
export default MyListings;