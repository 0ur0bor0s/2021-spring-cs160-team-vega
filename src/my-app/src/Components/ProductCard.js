import React from "react";
import img_placeholder from "../image_placeholders/fifthave-5735-walnut-angle-web.jpg";
import "./CSS/ProductCard.css";

class ProductCard extends React.Component {
    render() {
        return (
            <div className="card">
                <img src={img_placeholder} alt="Avatar" style={{width:"100%"}} />
                <div className="container">
                    <h4><b>{this.props.product.product_title}</b></h4>
                    <p>${this.props.product.product_price}</p>
                </div>
          </div>
        )
    }
}

export default ProductCard;