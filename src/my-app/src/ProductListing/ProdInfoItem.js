import React from "react"
import styles from "./ProductInfoItem.module.css"


class ProdInfoItem extends React.Component{
    render () {
        const {id, price, title, description, sellersId} = this.props.product


        return <div className={styles.description}>
            <h1 className={styles.productName}>{title}</h1>
            <text>{sellersId}</text>
            <h3 className={styles.price}>Price: ${price}</h3>
            <text><b>Product description:</b> <br></br> 
            {description}</text> <br></br> 
            <button className={styles.item}>Add to Cart</button>

        </div>
    }
}
export default ProdInfoItem