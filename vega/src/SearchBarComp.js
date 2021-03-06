import React from 'react';

class SearchBar extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            phrase: ""
        }
    }

    // handleSubmit() {
    //   console.log('Search submitted to backend');
    // }

    
    render() {
        return (
            <div className="SearchBar" >
                <form action="/ecomm_crawler" method="POST">
                    {/*
                        For now, this will send an http req to ecomm_crawler.
                        Will make a search route later:
                        Search will first check db for exsisting products containing the search phrase.
                        If products exist, directly return http res with that data.
                        Otherwise perform a crawl using the searched phrase.
                     */}
                    <input type="text" name="keyword" placeholder="Search.." />
                    <button type="submit">Search</button>
                </form>
            </div>
        );
    }
}

export default SearchBar;