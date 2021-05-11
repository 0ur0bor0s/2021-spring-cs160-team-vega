import { storeKeyNameFromField } from "@apollo/client/utilities";
import React, { useState } from "react"
import { v4 as uuidv4 } from "uuid";
import ProductInfoContainer from "./ProductInfoContainer"
import { gql, useMutation } from '@apollo/client';


const CREATE_NEW_PRODUCT = gql`
        mutation createNewProduct(
                $product_title: String!
                $product_desc: String!
                $product_price: Float!
                $product_seller_id: Float!
            ) {  
                createNewProduct(
                        product_title: $product_title
                        product_desc: $product_desc
                        product_price: $product_price
                        product_seller_id: $product_seller_id
                )
        }
        `;


export function CreateNewListing(props) {
    const [values, setValues] = useState({ 
        title: '',
        price: 0.0,
        description: '',
        sellerID: 1, // Test Data, would use sellerID from session props
    })
    const [submitted, setSubmitted] = useState(false);
    const [valid, setValid] = useState(true);
    const [CreateNewProduct, { data }] = useMutation(CREATE_NEW_PRODUCT);

    const handleTitleInputChange = (event) => {
        setValues({...values, title: event.target.value});
    };

    const handlePriceInputChange = (event) => {
        setValues({...values, price: event.target.value});
    };

    const handleDescriptionInputChange = (event) => {
        setValues({...values, description: event.target.value});
    };

    const handleSubmit = (event) => {
        if(values.title && values.price && values.description) {
            setValid(true);
        }
        setSubmitted(true);
    }
    

    return (
        <div className = "form-container">
            <form className= "register-form" onSubmit={e => {
                e.preventDefault();
                handleSubmit();
                CreateNewProduct({variables: {  
                        product_title: values.title, 
                        product_price: Number(values.price), 
                        product_desc: values.description, 
                        product_seller_id: values.sellerID
                }})
            }}
            >
                {submitted && valid ? <div className="success-message">Success, product has been created.</div> : null }
                <input 
                    id= "title"
                    className= 'form-field'
                    type= "text"
                    placeholder= "Product Title"
                    name="title"
                    value={values.title} 
                    onChange={handleTitleInputChange}
                />
                <br></br>
                {submitted && !values.title ? <span>Please enter a Product Title.</span> : null }
                <br></br>
                <input 
                    id= "price"
                    className= 'form-field'
                    type= "decimal"
                    name="price"
                    value={values.price} 
                    onChange={handlePriceInputChange}    
                />
                <br></br>
                {submitted && !values.price ? <span>Please enter a Price.</span> : null }
                <br></br>
                <input 
                    id= "description"
                    className= 'form-field'
                    type= "text"
                    placeholder= "Product Description"
                    name="description"
                    value={values.description} 
                    onChange={handleDescriptionInputChange}
                />
                <br></br>
                {submitted && !values.description ? <span>Please enter a Product Description.</span> : null }                
                <br></br>
                <input 
                    type="submit" 
                    value="Create New Product" 
                    onSubmit={handleSubmit}/>
            </form>
        </div>
    )

} export default CreateNewListing
