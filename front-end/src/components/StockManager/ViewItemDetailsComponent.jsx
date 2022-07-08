import React, { Component } from "react";
import StockManagerService from "../services/StockManagerService";
// import Pdf from "react-to-pdf";
import ReactToPrint from 'react-to-print';

//const ref = React.createRef();

class ViewItemDetailsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemCode: this.props.match.params.item_code,
      items: [],
    };
  }

  componentDidMount(){
    StockManagerService.getItemById(this.state.itemCode).then((res) => {
        this.setState({ items: res.data});
    });
}

  render() {
    return (
      <>
        <div className="react-pdf__Page__canvas_Single_View1">
        <div ref ={el=>(this.componentRef=el)}>
          {/* <div className="Post" ref={ref}> */}
            <div>
              <div>
                <br></br>
                <div className="card col-md-6 offset-md-3">
                  <h3 className="text-center">
                    <u>View Item Details</u>
                  </h3>
                  <div className="card-body">
                    <div className="row">
                      <label>
                        <b>Item Code: </b>{" "}
                      </label>
                      <div>{this.state.items.item_code}</div>
                    </div>
                    <br></br>
                    <br></br>
                    <div className="row">
                      <label>
                        <b>Item Name: </b>
                      </label>
                      <div>{this.state.items.item_name}</div>
                    </div>
                    <br></br>
                    <br></br>
                    <div className="row">
                      <label>
                        <b>Quantity: </b>
                      </label>
                      <div>{this.state.items.qty}</div>
                    </div>
                    <br></br>
                    <br></br>
                    <div className="row">
                      <label>
                        <b>Re-Order Level: </b>
                      </label>
                      <div>{this.state.items.availability}</div>
                    </div>
                    <br></br>
                    <br></br>
                 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='text-right mb-2 mr-5'>
                    <ReactToPrint
                        trigger={()=>{
                        return <button className="btn btn-success">Download Report</button>
                        }}
                        content={()=>this.componentRef}
                        documentTitle = 'Employee Report'
                        pageStyle= "print"/>
            </div> 
      </>
    );
  }
}

export default ViewItemDetailsComponent;
