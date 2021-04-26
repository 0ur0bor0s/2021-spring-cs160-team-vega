import React from "react"
import { v4 as uuidv4 } from "uuid";


import ProductInfoContainer from "./ProductInfoContainer"

class CreateNewListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: uuidv4(),
            title: '',
            description: '',
            price: 0,
            seller_id: 1 //Should get sellerID from session
        }

        this.handleChangePrice = this.handleChangePrice.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

   handleChangeTitle(event) {
        this.setState({title: event.target.value})
   }

   handleChangeDescription(event) {
       this.setState({description: event.target.value})
   }

   handleChangePrice(event) {
        this.setState({price: event.target.value})
}

   handleSubmit(event) {
       alert('A product was made: \nID:' +this.state._id + '\n' + this.state.title + this.state.description + this.state.price);
       
       event.preventDefault();
   }

   render() {
       return (
           <form onSubmit={this.handleSubmit}>
               <label>
                   Product Title: 
                   <input name="title" type="text" value ={this.state.title} onChange={this.handleChangeTitle} /> 
               </label>
               <br></br>
               <label>
                   Product Description: 
                   <textarea value={this.state.description} onChange={this.handleChangeDescription} />
               </label>
               <br></br>
               <label>
                   Product Price: 
                   <input name="price" type="number" value ={this.state.price} onChange={this.handleChangePrice} /> 
               </label>
               <input type="submit" value="Submit" />
           </form>
       )
   }

} export default CreateNewListing;