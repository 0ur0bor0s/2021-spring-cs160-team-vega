import React, { useEffect, useState } from "react";
import {useQuery} from "graphql-hooks";
// import IndivSellerListingContainer from "./SellerListingContainer";
import SellerListingCard from "./SellerListingCard";
import EditListingInfoPopUp from "./EditListingInfoPopUp";
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
    const productResponse = GET_PRODUCTS_BY_SELLER_USERNAME_QUERY('user1');  // should take arg of searched name
    console.log("seller username: " + sellerUsername);
    console.log("initial products loaded: " + productResponse.data);

    useEffect(() => {
        console.log("a seller's product list must have changed.." + productResponse.data);
    }, [productResponse.getProductsBySellerUsername]);

    if (productResponse.error) console.log('There was a problem with GET_PRODUCTS_BY_SELLER_USERNAME_QUERY');
    if (productResponse.loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* 
                - Each of product's properties is passed as a prop 
                - Don't know if Edit option should go in here or in the individual 'SellerListing" Component.
            */}
            <h1>Listed items by {sellerUsername}</h1>
            <div className={Styles.listedItemsContainer}>
                {/*} {(useGetProductsBySellerUsernameQuery).map(product => { */}
                {!productResponse.data ? <text>No listings have been made.</text> : productResponse.data.getProductsBySellerUsername.map(product => { 
                    return (
                        <div className={Styles.listing}>
                            <SellerListingCard 
                                title={product.product_title}
                                price={product.product_price}
                                description={product.product_desc}
                                // images={product.images}
                                product_id={product._id}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
            
        //     {/* 
        //         Edit Button toggles the popup for EditListing 
        //             - put this in this component - inside map/for each or put in individual sellerlisting component?
        //     */}
        // <div className="btn" onClick={this.toggleEditListingPop} align="right">
        //     <button>Edit</button>
        // </div>
        // {props.editAListing ? <EditListingInfoPopUp toggle={this.toggleEditListingPop} /> : null}
            
        );
    
};
export default AllSellerListingsContainer;