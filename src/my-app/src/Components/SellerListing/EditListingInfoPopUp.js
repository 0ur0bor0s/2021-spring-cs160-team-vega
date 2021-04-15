import React from "react";



class EditListingInfoPopUp extends React.Component {
    
    // Calls the parent's (EditListingInfoContainer) toggleEditListingPop()
    handleClick = () => {
        this.props.toggleEditListingPop();
    };

    render() {
        const {id, price, title, description, seller_id} = this.props.product;

        return (
            <div className="modal">
                <div className="modalContent">
                    {/* What does &times do? */}
                    <span className="close" onClick={this.handleClick}>&times;</span>
                    
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

                    <text>Update..</text>
                    <form action="" method="put">
                        <input type="text" name="title" placeHolder={title} />
                        <input type="text" name="description" placeHolder={description} />
                        <input type="text" name="price" placeHolder={price} />

                        {/* 
                            TODO:
                                - If no images, add media button; else add another media button option. 
                                - show a mini thumbnail for each photo uploaded.    
                        */}

                        <input type="image" name="image" />
                    </form>
                </div>
            </div>
        );
    }
}
export default EditListingInfoPopUp;