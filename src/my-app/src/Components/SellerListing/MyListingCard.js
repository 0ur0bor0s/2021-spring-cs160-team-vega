// import { parseAndCheckHttpResponse } from "@apollo/client";
import React, { useState, useEffect } from "react";
import Styles from "./MyListings.module.css";
// import EditListingModal from 'react-modal';
import EditListingModal from "./EditListingModal";


// Presentational Component to display a Seller's listing of a product and its info.
const MyListingCard = props => {

    const [isOpen, setIsOpen] = useState(false);
    console.log("edit status: " + isOpen);

    // useEffect(() => {
    //     console.log("a seller's product list must have changed..");
    // }, [isOpen]);

    const close = () => {
        setIsOpen(false);
        window.location.reload();   // there should be a way to re-render the component, instead of reloading the entire page.
    }

    return (
        <div className={Styles.listing}>
            <div className={Styles.infoContainer}>
                <div className={Styles.title}>{props.title}</div>    
                <div className={Styles.product_id}>ID: {props.product_id}</div>
                <div className={Styles.description}>{props.description}</div>
                <div className={Styles.price}>${props.price}</div>
                <div className={Styles.media}>
                    {/* <img src={props.product.img} /> */}
                    <img src="../../image_placeholders/fifthave-5735-walnut-angle-web.jpg" alt="No Image Available." width="25" height="25"></img>
                </div>
            
            </div>
             <div>
                <button className={Styles.editButton} onClick={() => setIsOpen(true)}>Edit</button>
                {isOpen ?  
                    <EditListingModal onClose={ close }>
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

export default MyListingCard;