import React from "react";
import ProdInfoImg from "../ProductListing/ProdInfoImg";
import ProdInfoItem from "../ProductListing/ProdInfoItem";
import { v4 as uuidv4 } from "uuid";    // temp
import EditListingInfoPopUp from "./EditListingInfoPopUp";

/* 
    TODO (refactoring):
    - Change this to a presentational component (stateless and const.)  that accepts the outside container's props (which is the state [product]).
    - Move the edit button (toggleEditListingPop) to the outside container, separating it from this presentational component.
        - figure out how EditListingPop can efficiently get the props of the container/this presentational component.
*/
class SellerListingContainer extends React.Component {
    state = {
        product: {  // this info should be provided by SellerListsingsPage for each listing
            id: uuidv4(),  //Using uuid as a random generator, will be reading from db later
            price: "19.99",
            title: "Lego Set",
            description : "Hella legos.",
            images: "list of images here",
            seller_id: "jalend",
        },
        editListing: false
    }     

    toggleEditListingPop = () => {
        this.setState({
            editListing: !this.state.editListing
        });
    };

    render() {
        return (
            // when to use div className attr?
            <div>
                <div style="width:500px;height:100px;border:1px solid #000;">
                    <div align="top">     
                        <div align="center">${this.state.product.title}</div>    
                    </div>
                    <div align="left"><ProdInfoImg /></div>
                    <div align="center">${this.state.product.description}</div>
                    <div align="right">${this.state.product.price}</div>
                </div>
                {/* Edit Button toggles the popup for EditListing */}
                <div className="btn" onClick={this.toggleEditListingPop} align="right">
                    <button>Edit</button>
                </div>
                {this.state.seen ? <EditListingInfoPopUp toggle={this.toggleEditListingPop} /> : null}
            </div>
        );
    }
}
export default SellerListingContainer;