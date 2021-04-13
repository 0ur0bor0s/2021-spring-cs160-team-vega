import { gql, useQuery } from '@apollo/client';
import User from './user';

export const useGetProductsQuery = (searchStr) => {
    const query = gql` 
    query GetProducts($searchStr: String!) {
        getProducts(searchStr: $searchStr) {
            product_title
            product_desc
            product_price
            product_seller_id
        }
    }
    `
    
    return useQuery(query, {
        variables: {
            searchStr
        }
    });
}


// or is sellerId an int
// $sellerId
export const useGetProductsBySellerIdQuery = (sellerId) => {
    const query = gql`
        query getProductsBySellerId($sellerId: Int!) {    
            getProductsBySellerId(product_seller_id: $sellerId) {
                product_title
                product_desc
                product_price
                product_seller_id
            }
        }
        `

    return useQuery(query, {
        variables: {
            sellerId
        }
    });
}


export const useGetProductsBySellerUsernameQuery = (username) => {
    const query = gql`
        query getProductsBySellerUsername($username: String!) {    
            getProductsBySellerUsername(username: $username) {
                product_title
                product_desc
                product_price
                product_seller_id
            }
        }
        `

return useQuery(query, {
    variables: {
        username
    }
});

}