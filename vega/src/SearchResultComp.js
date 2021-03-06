// import React, { useState } from 'react';
// import $ from 'jquery';
// import SearchBar from './SearchBar';
// import App from '/.App';

// function SearchPage() {
//     return App;
// }


// // export default class SearchPage extends React.Component{
// //     constructor(props){
// //         super(props);

// //         // currently holds one item retrieved from the web crawl search stored in db
// //         this.state = {
// //             buy_link: "",
// //             name: "",
// //             price: "",
// //             img_link: ""
// //         }
// //     }

// //     componentDidMount(){
// //         const url = "mongodb+srv://ScraperUser:F70vBi0jVsFPF5je@cluster0.sdafj.mongodb.net/items?retryWrites=true&w=majority";
// //         const response = fetch(url)
// //         const data = await response.d
// //     }

    
// // }

// // fetch('/SearchPage', {
// //     method: 'POST',
// //     headers: { 'Content-Type': 'application.json' },
// //     body: JSON.stringify({  })
        
// //     },
// //     body: state
// // });

// // const SearchPage = () => {
// //     return (
// //         <div className="SearchPage">
// //             <h1>Search Page</h1>
// //             <div><SearchBar /></div>
// //             <body>
// //                 <div>Product:</div>
// //             </body>
// //         </div>
// //     );
// // }

// export default SearchPage

import React from 'react';

// Component for ONE search result
class SearchResult extends React.Component {
    // constructor(props) {
    //   super(props);
  
    //   this.state = {
    //     keyword: '',
    //     numPages: 2
    //   }
    // }
  
    // handleChange(event) {
    //   this.setState({value: event.target.keyword});
    //   this.setState({numPages: event.target.numPages});
    // }
  
    // handleSubmit(event) {
    //   console.log('Search submitted to backend');
    //   event.preventDefault();
    // }

    constructor(props){
      super(props);

      // currently holds one item retrieved from the web crawl search stored in db
      this.state = {
          buy_link: "",
          name: "",
          price: "",
          img_link: ""
      }
      this.getSearchResult = this.getSearchResult.bind(this);
    }

// constructor(props) {
  //   super(props);
  //   this.state = { apiReponse: '' };
  // }
  
    getSearchResult(){
      fetch(`http://localhost:3080/ecomm_crawler`)
        .then(res => res.json())
        .then(res => {
          this.setState({buy_link: res.buy_link});
          this.setState({name: res.name});
          this.setState({price: res.price});
          this.setState({img_link: res.img_link});
        })
        .catch(err => err);
    }

    componentDidMount(){
      this.getSearchResult();
    }

  // callAPI() {
  //   fetch("http://localhost:9000/testAPI")
  //       .then(res => res.text())
  //       .then(res => this.setState({ apiResponse: res }))
  //       .catch(err => err);
  // }
  
  // componentDidMount() {
  //   this.callAPI();
  // }



    // dont know if change/submit is needed for retrieving info from http res

    // handleChange(event) {
    //   this.setState({value: event.target.keyword});
    //   this.setState({numPages: event.target.numPages});
    // }
  
    // handleSubmit(event) {
    //   console.log('Search submitted to backend');
    //   event.preventDefault();
    // }

    render() {
      return (
        <div className="SearchResult">
        {/* This needs to return data from http res */}
            <body>Product Name: {this.state.name}</body>
            <body><img src={this.state.img_link} /></body>
            <body>Price: {this.state.price}</body>
            <body>Buy Link: <a href={this.state.buy_link} /></body>
        </div>
      )
    }
  }

  export default SearchResult;