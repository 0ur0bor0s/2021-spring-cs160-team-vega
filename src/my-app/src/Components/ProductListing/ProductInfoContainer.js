import React from "react"
// import ProductInfoList from "./ProductInfoList"
import Header from "../Header"
import ProdInfoItem from "./ProdInfoItem"
import { v4 as uuidv4 } from "uuid";
import ProdInfoImg from "./ProdInfoImg";
import { GET_PRODUCTS_BY_PRODUCT_ID_QUERY } from "../../graphql/product";


class ProductInfoContainer extends React.Component {
    state = {
        product: 
            {
                id: uuidv4(),  //Using uuid as a random generator, will be reading from db later
                price: "19.99",
                title: "Lego Set",
                description : "Hella legos.",
                images: "list of images here",
                seller_id: "1",
            },
        
    }

    divStyle = {
        display: 'flex',
        alignItems: 'center'
      };

    render() {
        return (
            <div>
                <div style={this.divStyle}>
                    < ProdInfoImg />
                    < ProdInfoItem 
                        product={this.state.product} />
                    </div>
            </div>
        )
    }
}
export default ProductInfoContainer