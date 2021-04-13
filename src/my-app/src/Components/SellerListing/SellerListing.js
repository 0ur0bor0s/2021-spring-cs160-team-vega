// import { parseAndCheckHttpResponse } from "@apollo/client";
import React from "react";
import Styles from "./SellerListing.module.css";
import Card from "react"
// import EditListingInfoPopUp from "./EditListingInfoPopUp";


// Presentational Component to display a Seller's listing of a product and its info.
const SellerListing = props => (
    // const {id, price, title, description, seller_id} = this.props.product;

    
        <div className={Styles.infoContainer}>
            {/* 
                - figure out how to properly pass/access the internal states of the product property 
                - display all images
            */}
             {/* <div className={Styles.info}> */}
                <div className={Styles.title}>{props.title}</div>    
                {/* <div align="left"><ProdInfoImg /></div> */}
                <div className={Styles.product_id}>{props.product_id}</div>
                <div className={Styles.description}>{props.description}</div>
                <div className={Styles.price}>${props.price}</div>
                <div className={Styles.media}>
            {/* </div> */}
            
            {/* <img src={props.product.img} /> */}
            </div>
        
        </div>
    
    // {/* Edit Button toggles the popup for EditListing */}
       
    
);

export default SellerListing;


{/* <div>
<Card border="dark" style={{ width: '18rem'}}>
    <Card.Img variant="left" src={props.images} />
    <Card.body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Subtitle>ID: {props.product_Id}</Card.Subtitle>
        <Card.text>{props.description}</Card.text>
    </Card.body>
</Card>
</div> */}

