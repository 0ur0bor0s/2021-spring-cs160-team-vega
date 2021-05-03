import React from "react"
import { ObjectID } from "typeorm";
import { id } from "./ProductInfoContainer.js"
import { deleteListing } from "...../server/src/productDelete.ts"

//Delete button calls deleteListing function with object id
class ProdDelete extends React.Component {
    render() {
        return <div align='right'>
            <button onClick={deleteListing(id)}>
                Delete Listing
            </button>
        </div>
    }
}

export default ProdDelete