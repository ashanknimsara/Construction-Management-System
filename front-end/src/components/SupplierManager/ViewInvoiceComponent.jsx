import { useParams, useHistory, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import SupplierManagerService from '../../Services/SupplierManagerService';
import invoiceHeader from '../../assets/images/supplier_manager/invoiceheader.png';
import supplier_address from '../../assets/images/supplier_manager/supplier_address.png';
import issued_date from '../../assets/images/supplier_manager/issued_date.png';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import supplier_name from '../../assets/images/supplier_manager/suppliername.png';
import supplier_phone from '../../assets/images/supplier_manager/supplierphoneno.png';
import { InvoiceTable } from './InvoiceTableComponent';
import Button from '@mui/material/Button';
import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import { Paper } from '@mui/material';

export const ViewInvoiceComponent = () => {
  const params = useParams();
  const history = useHistory();

  const [invoiceDetails, setInvoiceDetails] = useState({});
  const [supplierDetails, setSupplierDetails] = useState({});
  const [itemDetails, setItemDetails] = useState([]);
  const [isOpen, setIsOpen] = React.useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    SupplierManagerService.getInvoiceById(params.invoice_id).then((res) => {
      const invoice = res.data;

      setInvoiceDetails({ ...invoice });
      setSupplierDetails({ ...invoice.supplier });
      setItemDetails([...invoice.items]);
    });
    console.log(invoiceDetails);
    console.log(supplierDetails);
    console.log(itemDetails);
  }, []);
  //Generate pdf
  const generatePDF = () => {
    const input = document.getElementById('invoice');
    const pdf = new jsPDF('l', 'px', 'a4');
    if (pdf) {
      domtoimage.toPng(input).then((imgData) => {
        pdf.addImage(imgData, 'PNG', 5, 30);
        pdf.save('invoice.pdf');
      });
    }
  };

  return (
    <>
      <div className='invoice-container'>
        <div className='view-invoice invoice-first-part'>
          <div id='btn-move-back' className='backward-navigation'>
            <Link to='/supplier_Manager_Dashboard'>
              {`< `}Supplier Manager Dashboard{' '}
            </Link>
          </div>
          <div id='btn-generate-container'>
            <Button
              variant='contained'
              onClick={generatePDF}
              startIcon={<FileDownloadIcon />}
            >
              Generate Invoice
            </Button>
          </div>
        </div>
        <Paper elevation={24} sx={{ width: '58%',margin:'20px 200px 0px 400px' }}>
          {' '}
          <div id='invoice'>
            <div className='view-invoice invoice-header'>
              <img src={invoiceHeader} alt='inoiveHeader' />
            </div>
            <br />
            <div className='view-invoice '>
              <div className='second-part'>
                <figure className='supplier-address position-relative'>
                  <img src={supplier_name} alt='supplier_address' />
                  <figcaption>{supplierDetails.supplierName}</figcaption>
                </figure>
                <figure className='supplier-address position-relative'>
                  <img src={supplier_phone} alt='supplier_address' />
                  <figcaption>{supplierDetails.phoneNumber}</figcaption>
                </figure>

                <figure className='supplier-address position-relative'>
                  <img src={supplier_address} alt='supplier_address' />
                  <figcaption>{supplierDetails.supplierAddress}</figcaption>
                </figure>
                <figure className='issued-date position-relative'>
                  <img src={issued_date} alt='issued_date' />
                  <figcaption>{invoiceDetails.issued_date}</figcaption>
                </figure>
              </div>
            </div>
            <br />
            <div className='view-invoice'>
              <div className='item-table'>
                <InvoiceTable
                  key={invoiceDetails.invoice_id}
                  total_amount={invoiceDetails.total_amount}
                  paid_amount={invoiceDetails.paid_amount}
                  description={invoiceDetails.description}
                  items={itemDetails}
                />
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </>
  );
};

export default ViewInvoiceComponent;
