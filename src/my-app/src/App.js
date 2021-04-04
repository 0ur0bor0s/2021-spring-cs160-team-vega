import logo from './logo.svg';
import './App.css';
import SearchPage from './SearchPage.js';
import Header from "./Header"
import ProductInfoContainer from './ProductListing/ProductInfoContainer'

function App() {
  return (
    <div className="App">
      {/* To view changes, make a call to your component here. 
      Comment or uncomment other components as you see fit  */}
      <Header />
      <SearchPage />
      {/* <ProductInfoContainer /> */}
    </div>
  );
}

export default App;
