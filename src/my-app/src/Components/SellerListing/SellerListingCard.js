// import { parseAndCheckHttpResponse } from "@apollo/client";
import React, { useState, useEffect } from "react";
import Styles from "./SellerListing.module.css";
// import EditListingModal from 'react-modal';
import EditListingModal from "./EditListingModal";


// Presentational Component to display a Seller's listing of a product and its info.
const SellerListingCard = props => {

    const [isOpen, setIsOpen] = useState(false);
    console.log("edit status: " + isOpen);

    return (
        <div className={Styles.listing}>
            <div className={Styles.infoContainer}>
                <div className={Styles.title}>{props.title}</div>    
                <div className={Styles.product_id}>{props.product_id}</div>
                <div className={Styles.description}>{props.description}</div>
                <div className={Styles.price}>${props.price}</div>
                <div className={Styles.media}>
                    <img src={props.images} alt="No Image Available." width="25" height="25"></img>
                </div>
            
            </div>
             <div>
                <button className={Styles.editButton} onClick={() => setIsOpen(true)}>Edit</button>
                {isOpen ? 
                    <EditListingModal open={isOpen} onClose={() => setIsOpen(false)}>
                        {props.product_id}
                        {props.title}
                        {props.price}
                        {props.description}
                        {props.images}
                    </EditListingModal> 
                    : 
                    null
                }
            </div>
        </div>
    );
};

export default SellerListingCard;