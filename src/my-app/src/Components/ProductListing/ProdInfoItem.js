import React from "react"
import styles from "./ProductInfoItem.module.css"
import ProdAddToCart from "./ProdAddToCart"

class ProdInfoItem extends React.Component{
    render () {
        const {id, price, title, description, seller_id} = this.props.product


        return <div className={styles.description}>
            <h1 className={styles.productName}>{title}</h1>
            <text>Seller ID: {seller_id}</text>
            <h3 className={styles.price}>Price: ${price}</h3>
            <text><b>Product description:</b> <br></br> 
            {description}</text> <br></br> 
            <ProdAddToCart /> 

        </div>
    }
}
export default ProdInfoItem