import React from "react";
import Header from "../Components/Header";
import "./Home.css";
import ProductCard from "../Components/ProductCard";
import { GET_TWENTY_PRODUCTS_QUERY } from "../graphql/product";


const Home = (props) => {

  const {loading, data, error} = GET_TWENTY_PRODUCTS_QUERY();
  let products = [];
  console.log('data: ' + data);
  if (!loading) {
    products = data ? data.getTwentyProducts : [];
  }
  console.log(products);

  return (
    <div id="main-div">
      <Header history={props.history}/>
      <h1><center>Home</center></h1>
      <div className="div-products">
        {
          products.map((product, i) => {
            return <ProductCard product={product} key={i} />
          })
        }
      </div>
    </div>

  );
}

export default Home;