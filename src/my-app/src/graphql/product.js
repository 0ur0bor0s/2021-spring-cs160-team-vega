import { gql, useQuery } from '@apollo/client';


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