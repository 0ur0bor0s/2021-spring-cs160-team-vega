// import { parseAndCheckHttpResponse } from "@apollo/client";
import React, { useState, useEffect } from "react";
import Styles from "./SellerListing.module.css";
// import EditListingModal from 'react-modal';
import EditListingModal from "./EditListingModal";


// Presentational Component to display a Seller's listing of a product and its info.
const SellerListingCard = props => {

    const [isOpen, setIsOpen] = useState(false);
    console.log("edit status: " + isOpen);


    // function toggleEditListingModal() {
    //     setEditModalIsOpen => (!editModalIsOpen);
    //     console.log(editModalIsOpen);
    // };


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
             <div>
                <button className={Styles.editButton} onClick={() => setIsOpen(true)}>Edit</button>
                <EditListingModal open={isOpen} onClose={() => setIsOpen(false)}>
                    {props.product_id}
                    {props.title}
                    {props.price}
                    {props.description}
                    {props.images}

                    {/* product_title={product_title}
                    product_price={product_price}
                    product_desc={product_desc} */}
                    {/* // 
                    //     TO DO:
                    //         - figure out if images will be in db.   
                    //  */}
                    {/* product_id={product._id}  */}
                </EditListingModal> 
                                         
                
                {/* <Modal product={props} isOpen={editModalIsOpen}>
                    <h2>Edit Product </h2>
                    const {id, price, title, description, seller_id} = this.props.product;
                </Modal> */}  
            </div>
            {/* {editStatus ? <EditListingModal product={props} isOpen={toggleEditListingModal} /> : null} */}
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

