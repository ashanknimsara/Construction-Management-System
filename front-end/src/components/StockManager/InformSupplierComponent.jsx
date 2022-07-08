import React, { Component } from 'react'
import StockMngNavBar from './StockMngNavBar'
import InformSupplierService from '../services/InformSupplierService'
//import { useState, useEffect } from 'react'


export default class InformSupplierComponent extends Component {
    constructor(props) {
        super(props)
            this.state = {
                informId: '',
                supplierId: '',
                itemCode: '',
                itemName: '',
                quantity: '',
                description: '',

                supplierIdError: '',
                itemCodeError: '',
                itemNameError: '',
                quantityError: '',

            }
            this.requestedItem = this.requestedItem.bind(this);
//          
            this.InformItemCodeHandler = this.InformItemCodeHandler.bind(this);
            this.InformItemNameHandler = this.InformItemNameHandler.bind(this);
            this.InformQuantityHandler = this.InformQuantityHandler.bind(this);
            this.InformDescriptionHandler = this.InformDescriptionHandler.bind(this);
            this.InformSupplierIdHandler = this.InformSupplierIdHandler.bind(this);

            this.informItem = this.informItem.bind(this);

//             this.addItem = this.addItem.bind(this);
             //  this.issue-items = this.issue-items.bind(this);
       }

       validate = () => {
        let supplierIdError = "";
        let itemCodeError = "";
        let itemNameError = "";
        itemNameError= "";
        let quantityError = "";

        if (!this.state.supplierId) {
            supplierIdError = "Required";
          }
            if (!this.state.itemCode) {
                itemCodeError = "Required";
              }
                if (!this.state.itemName) {
                    itemNameError = "Required";
                  }
                    if (!this.state.quantity) {
                        quantityError = "Required";
                      }
                    
                          if(supplierIdError || itemCodeError || itemNameError || quantityError){
                            this.setState({supplierIdError, itemCodeError, itemNameError, quantityError});
                            return false;
                          }

                          return true;

  };

       requestedItem() {
        this.props.history.push('/requested-item');
    }

    informItem=(e) =>{
        e.preventDefault();
        const informSupplier = {
            informId: this.state.informId,
            supplierId: this.state.supplierId,
            itemCode: this.state.itemCode,
            itemName: this.state.itemName,
            quantity: this.state.quantity,
            description: this.state.description,

        };
    
         InformSupplierService.informItem(informSupplier).then(res => {
            this.setState({
                informId: '',
                supplierId: '',
                itemCode: '',
                itemName: '',
                quantity: '',
                description: '',

            });
            this.props.history.push('/inform-supplier');
        }
        );
    }
     InformItemCodeHandler = (event) => {
        this.setState({
            itemCode: event.target.value
        });
    }
    InformItemNameHandler = (event) => {
        this.setState({
            itemName: event.target.value
        });
    }
    InformQuantityHandler = (event) => {
        this.setState({
            quantity: event.target.value
        });
    }
    InformDescriptionHandler = (event) => {
        this.setState({
            description: event.target.value
        });
    }
    InformSupplierIdHandler = (event) => {
        this.setState({
            supplierId: event.target.value
        });
    }

     


  render() {
    return (
      <div>
             <>
                    <StockMngNavBar />
                </>
          <div className="container">
       
              <div className="row">
               

                  <div className='card col-md-6 offset-md-3' style={{marginTop: "15px"}}>
                  <h3 className="text-center">Inform Supplier</h3>
                      <div className='card-body'>
                          <form>
                                <div className="form-group">
                                    <label>Supplier ID</label>

                                   {/* <div class="col-auto my-1"> */}
                                     {/* <label class="mr-sm-2" for="inlineFormCustomSelect">Preference</label> */}
                                     <select class="custom-select mr-sm-2" id="inlineFormCustomSelect"
                                     value= {this.state.supplierId} onChange={this.InformSupplierIdHandler}>
                                     <option selected>Choose...</option>
                                      <option value="su001">su001</option>
                                        <option value="su002">su002</option>
                                         <option value="su003">su003</option>
                                         <option value="su004">su004</option>
                                        <option value="su005">su005</option>
                                         <option value="su006">su006</option>
                                     </select>
                                     <div style={{fontSize: 14, color: "red"}}>{this.state.supplierIdError}</div>
                                        </div>
                                     {/* </div>    */}

                                    {/* <input type="text" className="form-control" placeholder="Enter Project ID" value={this.state.item_code}
                                    onChange={this.itemCodeHandler} required/> */}
                            

                                <div className="form-group">
                                    <label>Item Code</label>
                                    <input type="text" className="form-control" placeholder="Enter Item Code" value={this.state.itemCode}
                                    onChange={this.InformItemCodeHandler} />
                                    <div style={{fontSize: 14, color: "red"}}>{this.state.itemCodeError}</div>
                                </div>

                                <div className="form-group">
                                    <label>Item Name</label>
                                    <input type="text" className="form-control" placeholder="Enter Item Name" value={this.state.itemName}
                                    onChange={this.InformItemNameHandler} />
                                    <div style={{fontSize: 14, color: "red"}}>{this.state.itemNameError}</div>
                                </div>

                                <div className="form-group">
                                    <label>ReOrder Level</label>
                                    <input type="text" className="form-control" placeholder="Quantity" value={this.state.quantity}
                                    onChange={this.InformQuantityHandler} />
                                    <div style={{fontSize: 14, color: "red"}}>{this.state.quantityError}</div>
                                </div>

                                <div className="form-group">
                                    <label>Discription</label>
                                    <textarea className="form-control" placeholder="Enter Discription" value={this.state.description} 
                                    onChange={this.InformDescriptionHandler}>
                                        
                                    </textarea>

                                    {/* <input type="text" className="form-control" placeholder="Enter Availability" value={this.state.availability}
                                    onChange={this.availabilityHandler} /> */}
                                </div>

                                <button className='btn btn-primary' onClick={this.informItem}>Send</button>
                                <button style={{marginLeft: "10px"}} className='btn btn-danger'>Cancel</button>

                                <button style={{marginLeft: "220px"}} className='btn btn-info' onClick={this.requestedItem}>View Items</button>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
  }
}
