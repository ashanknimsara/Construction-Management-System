import React, { Component } from 'react'
import StockManagerService from '../services/StockManagerService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export default class UpdateItemComponent extends Component {
    constructor(props) {
        super(props)
            this.state = {
                itemCode: this.props.match.params.item_code,
                invoiceId: '',
                itemName: '',
                quantity: '',
                availability: '',

            }
            // this.changeItemHandler = this.changeItemHandler.bind(this);
            this.invoiceIdHandler = this.invoiceIdHandler.bind(this);
            this.itemNameHandler = this.itemNameHandler.bind(this);
            this.quantityHandler = this.quantityHandler.bind(this);
            this.availabilityHandler = this.availabilityHandler.bind(this);

                this.editItem = this.editItem.bind(this);
        }

        notify() {
            toast.success("Updated successfully!", {
              position: toast.POSITION.TOP_CENTER
            });
          }
        
          notify1() {
            toast.error("Unsuccessfully!", {
              position: toast.POSITION.TOP_CENTER
            });
          }

          warning() {
            if (
              this.state.qty == this.state.availability ||
              this.state.qty < this.state.availability
            ) {
              toast.warn("Item is below or equal to the re-order level!", {
                position: toast.POSITION.TOP_CENTER,
              });
            }
          }

        componentDidMount() {
          StockManagerService.getItemById(this.state.itemCode).then( (res)=>{
            let item = res.data;
            this.setState({
              item_code: item.item_code,
              invoice_id: item.invoice_id,
              item_name: item.item_name,
              qty: item.qty,
              availability: item.availability,
            })
          })
        }


        editItem =(event) => {
            event.preventDefault();
            const item = {
                item_code: this.state.item_code,
                invoice_id: this.state.invoice_id,
                item_name: this.state.item_name,
                qty: this.state.qty,
                availability: this.state.availability,
    };
            StockManagerService.editItem(item,item.item_code).then( (res)=>{
                this.warning();
                this.notify();
                this.props.history.push('/');
            })
           console.log('item =>' +JSON.stringify(item));
           
        }

        itemCodeHandler = (event) => {
            this.setState({
                item_code: event.target.value
            })
        }
        invoiceIdHandler = (event) => {
            this.setState({
                invoice_id: event.target.value
            })
        }
        itemNameHandler = (event) => {
            this.setState({
                item_name: event.target.value
            })
        }
        quantityHandler = (event) => {
            this.setState({
                qty: event.target.value
            })
        }
        availabilityHandler = (event) => {
            this.setState({
                availability: event.target.value
            })
        }
        cancel = () => {
            this.notify1();
            this.props.history.push('/items');
        }

  render() {
    return (
      <div>
          <div className="container">
              <div className="row">
                  <div className='card col-md-6 offset-md-3' style={{marginTop: "15px"}}>
                  <h3 className="text-center">Update Item</h3>
                      <div className='card-body'>
                          <form>
                                <div className="form-group">
                                    <label>Item Code</label>
                                    <input type="text" className="form-control" placeholder="Enter Item Code" value={this.state.item_code}
                                    onChange={this.itemCodeHandler} />
                                </div>

                                <div className="form-group">
                                    <label>Invoice Id</label>
                                    <input type="text" className="form-control" placeholder="Enter Invoice Id" value={this.state.invoice_id}
                                    onChange={this.invoiceIdHandler} />
                                </div>

                                <div className="form-group">
                                    <label>Item Name</label>
                                    <input type="text" className="form-control" placeholder="Enter Item Name" value={this.state.item_name}
                                    onChange={this.itemNameHandler} />
                                </div>

                                <div className="form-group">
                                    <label>Quantity</label>
                                    <input type="text" className="form-control" placeholder="Enter Quantity" value={this.state.qty}
                                    onChange={this.quantityHandler} />
                                </div>

                                <div className="form-group">
                                    <label>Availability</label>
                                    <input type="text" className="form-control" placeholder="Enter Availability" value={this.state.availability}
                                    onChange={this.availabilityHandler} />
                                </div>

                                <button className='btn btn-primary' onClick={this.editItem}>Update</button>
                                <button className='btn btn-danger' onClick={this.cancel.bind(this)}style={{marginLeft: "10px"}}>Cancel</button>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
  }
}
