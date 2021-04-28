import { gql, useQuery , useMutation } from '@apollo/client';

// export const GET_PRODUCTS_BY_PRODUCT_NAME =
export const GET_PRODUCTS_BY_PRODUCT_NAME = (searchStr) => {
    const query = gql`
        query getProductsByProductName($searchStr: String!) {
            getProductsByProductName(searchStr: $searchStr) {
                _id
                product_title
                product_desc
                product_price
                product_seller_id
            }
        }
        `;
    
    return useQuery(query, {
        variables: {
            searchStr
        }
    });
}


// export const GET_PRODUCTS_BY_SELLER_ID_QUERY =
export const GET_PRODUCTS_BY_SELLER_ID_QUERY = (sellerId) => {
    const query = gql`
        
        query getProductsBySellerId($sellerId: Int!) {    
            getProductsBySellerId(product_seller_id: $sellerId) {
                _id
                product_title
                product_desc
                product_price
                product_seller_id
            }
        }
        `;

    return useQuery(query, {
        variables: {
            sellerId
        }
    });
}


// export const GET_PRODUCTS_BY_SELLER_USERNAME_QUERY =
export const GET_PRODUCTS_BY_SELLER_USERNAME_QUERY = (username) => {
    const query = gql`
        query getProductsBySellerUsername($username: String!) {    
            getProductsBySellerUsername(username: $username) {
                _id
                product_title
                product_desc
                product_price
                product_seller_id
            }
        }
        `;

return useQuery(query, {
    variables: {
        username
    }
});
}


// export const GET_PRODUCTS_BY_PRODUCT_ID_QUERY =
export const GET_PRODUCT_BY_PRODUCT_ID_QUERY = (_id) => {
    const query = gql`
        query getProductByProductId($_id: String!) {    
            getProductByProductId(_id: $_id) {
                _id
                product_title
                product_desc
                product_price
                product_seller_id
            }
        }
        `;
    return useQuery(query, {
        variables: {
            _id
        }
    });
}