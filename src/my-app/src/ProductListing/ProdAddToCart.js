import React from "react"
import styles from "./ProductInfoItem.module.css"


class ProdAddToCart extends React.Component {
    

    render () {
        return <div align='right'>
            <button className={styles.button}>Add to Cart</button>
        </div>
    }


}

export default ProdAddToCart