import React, { Component } from "react";
import StockManagerService from "../services/StockManagerService";
//import Pdf from "react-to-pdf";

//import JsPDF from 'jspdf';
import ReactToPrint from 'react-to-print';

class ListItemReportComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
  }

  componentDidMount(){
    StockManagerService.getItems().then((res) => {
        this.setState({ items: res.data});
    });
}

  render() {
    return (
      <>
      <div className="react-pdf__Page__canvas_Single_View3">
        {/* <div className="Post" ref={ref}> */}
        <div ref ={el=>(this.componentRef=el)}>
          <div style={{ marginLeft: 20 }}><br></br>
            <h1 className='text-center'>Vihanga Elecrticals and Constructions</h1>

                <h5 className='text-center'>Electrical installations, plumbing, steel fabricators {"&"} all civil constructions</h5>

                <h3 className='text-center'>Item Details</h3>
            <br></br>
            <div className="row">
              <table className="table table-striped table bordered" >
                <thead>
                  <tr>
                    <th>Item Code</th>
                    {/* <th>Invoice Id</th> */}
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>ReOrder Level</th>
                  </tr>
                </thead>

                <tbody>
                  {this.state.items.map((item) => (
                    <tr key={item.item_code}>
                    <td>{item.item_code}</td>
                    {/* <td>{item.invoice_id}</td> */}
                    <td>{item.item_name}</td>
                    <td>{item.qty}</td>
                   
                    <td>{item.availability}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
        </div>
      </>
    );
  }
}

export default ListItemReportComponent;
