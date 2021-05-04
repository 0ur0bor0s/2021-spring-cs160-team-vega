import { gql, useQuery, useMutation} from '@apollo/client';
// import { useMutation } from 'graphql-hooks';


export const GET_PRODUCTS_BY_PRODUCT_NAME = (searchStr) => {
    return gql`
        query getProductsByProductName($searchStr: String!) {
            getProductsByProductName(searchStr: $searchStr) {
                # _id
                product_id
                product_title
                product_desc
                product_price
                product_seller_id
            }
        }
    `;
}


export const GET_PRODUCTS_BY_SELLER_ID_QUERY = (sellerId) => {
    const query = gql`
        
        query getProductsBySellerId($sellerId: Int!) {    
            getProductsBySellerId(product_seller_id: $sellerId) {
                # _id
                product_id
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


export const GET_PRODUCTS_BY_SELLER_USERNAME_QUERY = (username) => {
    const query = gql`
        query getProductsBySellerUsername($username: String!) {    
            getProductsBySellerUsername(username: $username) {
                # _id
                product_id
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


// export const UPDATE_PRODUCT_LISTING = (product_id, product_title, product_desc, product_price) => {
//     const mutation = gql`
export const UPDATE_PRODUCT_LISTING = gql`
        mutation updateProductListing($product_id: SString!, $product_title: String!, $product_desc: String!, $product_price: Float!) {
            updateProductListing(
                product_id: $product_id, 
                product_title: $product_title, 
                product_desc: $product_desc, 
                product_price: $product_price)
                # image
        }
        `;
    
    // return useMutation( mutation, {
    //     variables: {
    //         product_id,
    //         product_title,
    //         product_desc,
    //         product_price
    //     }
    // })
// }

export const GET_TWENTY_PRODUCTS_QUERY = () => {
    const query = gql`
        query  {    
            getTwentyProducts {
                _id
                product_title
                product_desc
                product_price
                product_seller_id
            }
        }
        `;

    return useQuery(query, {});
}
