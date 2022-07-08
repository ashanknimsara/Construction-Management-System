import * as React from 'react';
import { makeStyles } from '@mui/styles';
import invoiceHeader from '../../assets/images/supplier_manager/invoiceheader.png';
import supplier_address from '../../assets/images/supplier_manager/supplier_address.png';
import issued_date from '../../assets/images/supplier_manager/issued_date.png';
import supplier_name from '../../assets/images/supplier_manager/suppliername.png';
import supplier_phone from '../../assets/images/supplier_manager/supplierphoneno.png';
import { InvoiceTable } from './InvoiceTableComponent';
import Button from '@mui/material/Button';
import Modal from 'react-bootstrap/Modal';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { ToastContainer, toast, Zoom, Bounce } from 'react-toastify';

import SupplierManagerService from '../../Services/SupplierManagerService';

const useStyles = makeStyles({
  cell: {
    color: 'white',
  },
});

export const InvoiceConfirmation = ({
  invoiceDetails,
  supplierDetails,
  prevStep,
}) => {
  const classes = useStyles();
  const history = useHistory();
  console.log(classes);
  const [isOpen, setIsOpen] = React.useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };
  //insert invoice details
  const insertInvoiceDetails = (e) => {
    e.preventDefault();
    SupplierManagerService.setInvoiceDetails(invoiceDetails)
      .then((res) => {
        toast.success('Invoice added successfully.');
        history.push('/supplier_Manager_Dashboard');
      })
      .catch((err) => {
        toast.success('Invoice addition unsuccessful.');
      });
  };
  React.useEffect(()=>{

    console.log()
  },[])
  //travel back to other details form
  const moveBack = (e) => {
    e.preventDefault();

    prevStep();
  };
  return (
    <div className='invoice-container supplier-details-container '>
      <div id='invoice' className='invoice-glass-view'>
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
              total_amount={invoiceDetails.total_amount}
              paid_amount={invoiceDetails.paid_amount}
              description={invoiceDetails.description}
              items={invoiceDetails.items}
            />
          </div>
        </div>
        <div className='btn-box invoice-confirmation-box'>
          <div class='continue-btn'>
            {' '}
            <Button variant='contained' color='primary' onClick={moveBack}>
              {`< Back`}
            </Button>
          </div>
          <div>
            {' '}
            <Button variant='contained' color='primary' onClick={showModal}>
              {`Continue >`}
            </Button>
          </div>
        </div>
        <Modal
          show={isOpen}
          onHide={hideModal}
          size='sm'
          aria-labelledby='contained-modal-title-vcenter'
          centered
        >
          <Modal.Header>
            <Modal.Title>Insert invoice details ?</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do you want to insert this information.</Modal.Body>
          <Modal.Footer>
            <button onClick={hideModal}>No</button>
            <button onClick={(e) => insertInvoiceDetails(e)}>Yes</button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
export default InvoiceConfirmation;
