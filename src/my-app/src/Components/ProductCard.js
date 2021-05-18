import React from "react";
// import img_placeholder from "../image_placeholders/fifthave-5735-walnut-angle-web.jpg";
import "./CSS/ProductCard.css";

class ProductCard extends React.Component {
    render() {
        return (
            <div className="card">
                <img src={this.props.product.img_link} alt="No image available" style={{width:"100%"}} />
                <div className="container">
                    <h4><b>{this.props.product.product_title}</b></h4>
                    <p>${this.props.product.product_price}</p>
                    <a href={this.props.product.buy_link}>View Product</a>
                </div>
          </div>
        )
    }
}

export default ProductCard;