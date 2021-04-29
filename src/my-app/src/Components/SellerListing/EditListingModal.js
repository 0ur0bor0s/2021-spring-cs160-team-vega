import React, { useState, setState } from "react";
import Styles from "./EditListing.module.css";
import { gql, useQuery, useMutation} from '@apollo/client';
// import { UPDATE_PRODUCT_LISTING } from "../../graphql/product";
// import { useMutation } from "graphql-hooks"
import ReactDom from "react-dom";
// import Modal from "react-modal";
// import Popup from "react-popup";


// Error: 'gql template literal' if this is in graphql/product.js
const UPDATE_PRODUCT_LISTING = gql`
    mutation updateProductListing($product_id: String!, $product_title: String!, $product_desc: String!, $product_price: number!) {
        updateProductListing(
            product_id: $product_id, 
            product_title: $product_title, 
            product_desc: $product_desc, 
            product_price: $product_price)
    }
`;


const EditListingModal = ({ children, onClose }) => {
    
    console.log(children);
    const [prod_id, prod_title, prod_price, prod_desc, prod_seller_id] = children;
    // console.log(product_id);
    // console.log(title);
    // console.log(price);
    // console.log(description);

    const [product_id, setProduct_id] = useState(prod_id);
    const [title, setTitle] = useState(prod_title);
    const [description, setDescription] = useState(prod_desc);
    const [price, setPrice] = useState(prod_price);
    
    const [executeUpdate] = useMutation(UPDATE_PRODUCT_LISTING);
        
    const handleSave = (evt) => {
        console.log("handling save:");
            evt.preventDefault();
            executeUpdate({ 
                variables: { 
                    product_id: product_id, 
                    product_title: title,
                    product_desc: description,
                    product_price: price
                }
            });
            console.log("closing edit modal");
            onClose();
    }

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
                    <form onSubmit={handleSave}
                        // onSubmit={ e => {
                        // console.log("submitting..");
                        //  e.preventDefault();
                        //  executeUpdate({ 
                        //      variables: { 
                        //          product_id: product_id, 
                        //          product_title: title,
                        //          product_desc: description,
                        //          product_price: price
                        //      }
                        //  });
                    >
                     
                        <div className={Styles.form}>
                            <div className={Styles.title}>
                                <label className={Styles.label}>Product Name:</label><br></br>
                                <input type="text" size="50"  maxLength="256" name="title" defaultValue={title} onChange={e => setTitle(e.target.value)} />
                            </div>
                            <div className={Styles.description}>
                                <label className={Styles.label}>Description:</label><br></br>
                                <textarea cols="70" rows="20" maxLength="1300" name="description" defaultValue={description} onChange={e => setDescription(e.target.value)} />
                            </div>
                            <div className={Styles.price}>
                                <label className={Styles.label}>Price:</label><br></br>
                                <input type="text" size="8" maxLength="10"name="price" defaultValue={price} onChange={e => setPrice(e.target.value)} />
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
                                <button type="submit">Save</button>
                                {/* <input type="submit" value="Save" /> */}
                            </div>
                            <div className={Styles.button}>
                                <button type="button" onClick={ onClose }>Cancel</button>
                            </div>
                        </div>
                    </form>
                    
                </div>
            </div>
        </>,
        document.getElementById('portal')
    
    );
}
export default EditListingModal;