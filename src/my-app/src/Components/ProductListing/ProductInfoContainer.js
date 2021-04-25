import React, { useState, useEffect } from "react"
// import ProductInfoList from "./ProductInfoList"
// import Header from "../Header"
import ProdInfoItem from "./ProdInfoItem"
import { v4 as uuidv4 } from "uuid";
import ProdInfoImg from "./ProdInfoImg";
import { GET_PRODUCT_BY_PRODUCT_ID_QUERY } from "../../graphql/product";




const ProductInfoContainer = () => {
    const productResponse = GET_PRODUCT_BY_PRODUCT_ID_QUERY('1'); // TEST DATA, SEARCHING ITEM ID 1
    console.log(productResponse.data);


    useEffect(() => {
        document.title = 'Vega';
      }, [productResponse.getProductByProductId]);

    if (productResponse.error) console.log('There was a problem with GET_PRODUCTS_BY_PRODUCT_ID_QUERY');
    if (productResponse.loading) return <div>Loading...</div>;



    return(
        <div>
        {!productResponse.data ? "No product": productResponse.data.getProductByProductId.map(product => {
            return (
                <div>
                    <ProdInfoItem
                        key={product._id}
                        id={product._id}
                        title={product.product_title}
                        price={product.product_price}
                        description={product.product_desc}
                        price={product.product_price}
                        sellerID={product.product_seller_id}
                        />
                </div>
            )
            })
    }   
        </div>
        
        
    )    
        
};
export default ProductInfoContainer;