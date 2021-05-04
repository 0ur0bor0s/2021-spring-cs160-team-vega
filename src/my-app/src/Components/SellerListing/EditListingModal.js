import React, { useState, setState } from "react";
import Styles from "./EditListing.module.css";
import { UPDATE_PRODUCT_LISTING } from "../../graphql/product";
import ReactDom from "react-dom";
import { useMutation } from "@apollo/client";

// class EditListingModal extends React.Component {
const EditListingModal = ({ children, onClose }) => {
    
    // console.log(children);
    const [product_id, product_title, product_price, product_desc, product_images] = children;
    // console.log("from children:");
    // console.log(product_id);
    // console.log(product_title);
    // console.log(product_price);
    // console.log(product_desc);
    // console.log(product_images);

    const [title, setTitle] = useState(product_title);
    const [description, setDescription] = useState(product_desc);
    const [price, setPrice] = useState(product_price);
    const [images, setImages] = useState(product_images);

    // console.log("use state values:");
    // console.log(product_id);
    // console.log(title);
    // console.log(price);
    // console.log(description);
    // console.log(images);

    const [updateListing, { loading }] = useMutation(UPDATE_PRODUCT_LISTING, {
        variables: {
            product_id: product_id, 
            product_title: title, 
            product_desc: description, 
            product_price: price
            // image
        }
    });
    
    const save = () => {
        updateListing();
        onClose();
    }

    return ReactDom.createPortal(
        <>
            <div className={Styles.overlay}>
                <div className={Styles.modal}>
                    {/* 
                        TODO:
                        - sanitize inputs prior to mutation (inside graphql/updatelisting)
                        - after mutating (updating), query all products again in AllSellerListingsContainer
                            - might need to use useEffect or some other hooks/functions.
                    */}
                    <div className={Styles.header}>Edit listing for product: {product_id}</div>
                    {/* <form action="" method="put"> */}
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
                                <input type="text" size="8" maxLength="10"name="price" defaultValue={price} onChange={e => setPrice(parseFloat(e.target.value))} />
                            </div>
                            {/* 
                                TODO:
                                    - If no images, add media button; else add another media button option. 
                                    - show a mini thumbnail for each photo uploaded.    
                            */}
                            <div className={Styles.media}>
                                <label className={Styles.label}>Upload Media: </label><br></br><br></br>
                                <input type="file" name="image" accept="image/*"/>
                            </div>
                        </div>
                        <div className={Styles.buttons}>
                            <div className={Styles.save}>
                                <button onClick={ save } disabled={ loading }>Save</button>
                                {/* <input type="submit" value="Save" /> */}
                            </div>
                            <div className={Styles.cancel}>
                                <button onClick={ onClose }>Cancel</button>
                            </div>
                        </div>
                </div>
            </div>
        </>,
        document.getElementById('portal')
    );
}
export default EditListingModal;