//import logo from './logo.svg';
import './App.css';
import SearchPage from './SearchPage.js';
import Header from "./Components/Header"
import { GET_PRODUCTS_BY_PRODUCT_NAME } from './graphql/product';
import { useQuery } from 'graphql-hooks';
import AllSellerListingsContainer from './Components/SellerListing/AllSellerListingsContainer';

//import ProductInfoContainer from './ProductListing/ProductInfoContainer'

function App() {
  //The input string "AA" represents the product you are trying to search for
  // const { loading, error, data } = useQuery(GET_PRODUCTS_BY_PRODUCT_NAME("i"));

  // if (loading) {
  //   return <div>loading...</div>
  // }

  //Data format for future reference:
  //{"getProducts":[{"__typename":"Product","product_title":"AAAAA","product_desc":"test","product_price":55.55,"product_seller_id":1}]}
  // console.log(data);

  return (
    <div className="App">
      {/* To view changes, make a call to your component here. 
      Comment or uncomment other components as you see fit  */}
      <Header />
      {/* <SearchPage /> */}
      <AllSellerListingsContainer />
      {/* <ProductInfoContainer /> */}
    </div>
  );
}

export default App;
