// import { parseAndCheckHttpResponse } from "@apollo/client";
import React, { useState, useEffect } from "react";
import Styles from "./SellerListing.module.css";

import EditListingInfoPopUp from "./EditListingInfoPopUp";


// Presentational Component to display a Seller's listing of a product and its info.
const SellerListingCard = props => {

    const [editStatus, setEditStatus] = useState(false);
    console.log("edit status: " + editStatus);


    function toggleEditListingPop() {
        setEditStatus(editStatus => !editStatus);
        console.log(editStatus);
    };


    return (
        <div className={Styles.listing}>
            <div className={Styles.infoContainer}>
                <div className={Styles.title}>{props.title}</div>    
                <div className={Styles.product_id}>{props.product_id}</div>
                <div className={Styles.description}>{props.description}</div>
                <div className={Styles.price}>${props.price}</div>
                <div className={Styles.media}>
                    {/* <img src={props.product.img} /> */}
                    <img src="../../image_placeholders/fifthave-5735-walnut-angle-web.jpg" alt="No Image Available." width="25" height="25"></img>
                </div>
            
            </div>
             <div onClick={toggleEditListingPop}>
                <button className={Styles.editButton}>Edit</button>
            </div>
            {editStatus ? <EditListingInfoPopUp product={props} toggle={toggleEditListingPop} /> : null}
        </div>
    
    // {/* Edit Button toggles the popup for EditListing */}
       
    );
};

export default SellerListingCard;


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

