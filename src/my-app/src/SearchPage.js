import React, { useState, useEffect } from 'react';
import SearchBar from './Components/SearchBar';
import { gql, useLazyQuery } from '@apollo/client';
//import { data } from 'browserslist';

const PRODUCT_QUERY = gql`
    query GetProduct($filter: String!) {
        getProducts(searchStr: $filter) {
            product_title
        }
    }
`;

const SearchPage = () => {
    const [searchFilter, setSearchFilter] = useState('');
    const [executeSearch, { data }] = useLazyQuery(PRODUCT_QUERY);

    return (
        <div className="SearchPage">
            <h1>Search Page</h1>
            <div>
                <input 
                    type="text"
                    onChange={ (e) => setSearchFilter(e.target.value)} 
                />
                <button
                    onClick= { () =>
                        executeSearch({
                            variables: { filter: searchFilter }
                        })
                    }
                >Search</button>
            </div>
            {data &&
                data.getProducts.map((product) => (
                    <div>{product.product_title}</div>
                ))
            }
            {console.log(data)}
        </div>
    );
};

export default SearchPage