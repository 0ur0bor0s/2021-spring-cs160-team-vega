import React from 'react';

const SearchBar = () => (
    <form action="/SearchPage/submit" method="get">
        <input
            type="text"
            id="header-search"
            placeholder="Search.."
            name="id" 
        />
        <button type="submit">Search</button>
    </form>
);

export default SearchBar;