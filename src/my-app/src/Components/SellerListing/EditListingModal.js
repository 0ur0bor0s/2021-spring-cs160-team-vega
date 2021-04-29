import React, { useState, setState } from "react";
import Styles from "./EditListing.module.css";
import { UPDATE_PRODUCT_LISTING } from "../../graphql/product";
import ReactDom from "react-dom";
// import Modal from "react-modal";
// import Popup from "react-popup";

// class EditListingModal extends React.Component {
const EditListingModal = ({ open, children, onClose }) => {
    if (!open) return null;
    
    // const productProp = props;
    // console.log(props.product_id);
    // console.log(productProp);
    // console.log(productProp.product);
    console.log(children);
    const [product_id, title, price, description, seller_id] = children;
    console.log(product_id);
    console.log(title);
    console.log(price);
    console.log(description);


    // const [save, doSave] = useState();
    function save() {
        console.log("saving");
        UPDATE_PRODUCT_LISTING(product_id, title, description, price);
    }

    // Calls the parent's (EditListingInfoContainer) toggleEditListingPop()
    // handleClick = () => {
    //     this.props.toggleEditListingPop();
    // };

        
        return ReactDom.createPortal(
            <>
             <div className={Styles.overlay}>
                 <div className={Styles.modal}>
                    {/* <div className={Styles.modal_content}> */}
                        {/* What does &times do? */}
                        {/* <span className="close" onClick={this.handleClick}>&times;</span> */}
                        
                        {/* 
                            TODO:
                            - Pop up should literally popup a new window on the page -- not display under the item.
                                - background behind pop up will be shadowed.
                            - Structure the popup window edit format to be similar to format of SellerListingContainer 
                            - determine action routing for listing update
                            - sanitize inputs prior to mutation (inside graphql/updatelisting)
                            - after mutating (updating), query all products again in AllSellerListingsContainer
                                - might need to use useEffect or some other hooks/functions.
                        */}
                        <div className={Styles.header}>Edit listing for product: {product_id}</div>
                        {/* <form action="" method="put"> */}
                            <div className={Styles.form}>
                                <div className={Styles.title}>
                                    <label className={Styles.label}>Product Name:</label><br></br>
                                    <input type="text" size="50"  maxLength="256" name="title" defaultValue={title} />
                                </div>
                                <div className={Styles.description}>
                                    <label className={Styles.label}>Description:</label><br></br>
                                    <textarea cols="70" rows="20" maxLength="1300" name="description" defaultValue={description} />
                                </div>
                                <div className={Styles.price}>
                                    <label className={Styles.label}>Price:</label><br></br>
                                    <input type="text" size="8" maxLength="10"name="price" defaultValue={price} />
                                </div>
                                {/* 
                                    TODO:
                                        - If no images, add media button; else add another media button option. 
                                        - show a mini thumbnail for each photo uploaded.    
                                */}
                                <div className={Styles.media}>
                                    <label className={Styles.label}>Upload Media: </label><br></br>
                                    <input type="file" name="image" accept="image/*"/>
                                </div>
                            </div>
                            <div className={Styles.buttons}>
                                <div className={Styles.button}>
                                    <button onClick={ save }>Save</button>
                                    {/* <input type="submit" value="Save" /> */}
                                </div>
                                <div className={Styles.button}>
                                    <button onClick={ onClose }>Cancel</button>
                                </div>
                            </div>
                        {/* </form> */}
                       
                    </div>
                </div>
            </>,
            document.getElementById('portal')
     
        );
    
}
export default EditListingModal;