import React, { useState, useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';

const PRODUCT_QUERY = gql`
query GetProducts($filter: String!) {
    getProductsByProductName(searchStr: $filter) {
        product_title
        product_price
    }
}
`;


const useKeywordSearch = (keyword) => {    
    const [products, setProducts] = useState([]);
    const [executeSearch, { data }] = useLazyQuery(PRODUCT_QUERY);

    useEffect(() => {
        executeSearch({
            variables: { filter: keyword }
        })

        setProducts(data ? data.getProductsByProductName : []);
    }, [executeSearch, data, keyword])

    return [products]
}

export default useKeywordSearch;