import React from "react"
import styles from "./ProductInfoItem.module.css"
import ProdAddToCart from "./ProdAddToCart"

class ProdInfoItem extends React.Component{
    render () {
        const id = this.props.id
        const price = this.props.price
        const title = this.props.title
        const description = this.props.description
        const seller_id = this.props.sellerID


        // Testing values
        console.log(description)
        console.log(id)
        console.log(price)
        console.log(title)
        console.log(seller_id)
        

        return <div className={styles.description}>
            <h1 className={styles.productName}>{title}</h1>
            <text>Seller ID: {seller_id}</text>
            <h3 className={styles.price}>Price: ${price}</h3>
            <b>Product description:</b> <br></br> 
            {description} <br></br> 
            
            <ProdAddToCart />  
            {/* Pass in the product id to the cart */}

        </div>
    }
}
export default ProdInfoItem