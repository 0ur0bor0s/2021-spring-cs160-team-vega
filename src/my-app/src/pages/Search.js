import React, { useState, useEffect } from 'react';
import Header from "../Components/Header";
import ProductCard from "../Components/ProductCard";
import useKeywordSearch from "../hooks/useKeywordSearch";

const Search = (props) => {
    const params = new URLSearchParams(props.location.search);
    const keyword = params.get('keyword');
    const [ products ] = useKeywordSearch(keyword);

    return (
        <div id="main-div">
            <Header history={props.history}/>
            <div className="div-products">
                {
                    products.map((product, i) => {
                        return <ProductCard product={product} key={i} />
                    })
                }
            </div>
        </div>
    )
}

export default Search;