import React from "react";
// import IndivSellerListingContainer from "./SellerListingContainer";
import SellerListing from "./SellerListing";
import EditListingInfoPopUp from "./EditListingInfoPopUp";
import Styles from "./SellerListing.module.css";
import { useGetProductsBySellerUsernameQuery } from "../../graphql/product";
import { v4 as uuidv4 } from "uuid";    // temp


// contains all products listed by seller. distributes them to individual seller listing containers
class AllSellerListingsContainer extends React.Component {
    state = {
        seller_id: "jalend",
        // products : useGetProductsBySellerUsernameQuery,
        products: [
            {
                // these states should be empty. will be populated by db.
                product_id: uuidv4(),  //Using uuid as a random generator, will be reading from db later
                price: "19.99",
                title: "Lego Set",
                description : "Hella legos.",
                images: "list of images here",  // []
                seller_id: "jalend",
            },
            {
                product_id: uuidv4(),  //Using uuid as a random generator, will be reading from db later
                price: "22.11",
                title: "HotWheels  bwl fiwbfb wlf",
                description : "Aweomse traca;vmanc;oahroanfntv ahawwwwwwwwwww",
                images: "list of images here",  // []
                seller_id: "jalend",
            }
        ],
        EditAListing: false
    };
    
    // use graphql to setstate ==> populates products with a list of products where sellerid=searchedSellerid

    toggleEditListingPop = () => {
        this.setState({
            editAListing: !this.state.editAListing
        });
    };



    render() {
        const { loading, error, data } = useGetProductsBySellerUsernameQuery(1);

console.log(data);
        if (loading) {
            return <div>loading...</div>
        }
        
        return (
            <div>
                {/* 
                    - Each of product's properties is passed as a prop 
                    - Don't know if Edit option should go in here or in the individual 'SellerListing" Component.
                */}
                <h1>Listed items by {this.state.seller_id}</h1>
                <div className={Styles.listedItemsContainer}>
                   {/*} {(useGetProductsBySellerUsernameQuery).map(product => { */}
                    {data.map(product => { 
                        return (
                            <div className={Styles.listing}>
                                <SellerListing 
                                    title={product.title}
                                    price={product.price}
                                    description={product.description}
                                    images={product.images}
                                    product_id={product.product_id}
                                />
                                <div onClick={this.toggleEditListingPop}>
                                    <button className={Styles.editButton}>Edit</button>
                                </div>
                                {this.editAListing ? <EditListingInfoPopUp product={product} toggle={this.toggleEditListingPop} /> : null}
                            </div>
                        );
                    })}
                </div>
            </div>
            
        //     {/* 
        //         Edit Button toggles the popup for EditListing 
        //             - put this in this component - inside map/for each or put in individual sellerlisting component?
        //     */}
        // <div className="btn" onClick={this.toggleEditListingPop} align="right">
        //     <button>Edit</button>
        // </div>
        // {props.editAListing ? <EditListingInfoPopUp toggle={this.toggleEditListingPop} /> : null}
            
        );
    }
}
export default AllSellerListingsContainer;