import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Badge } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { withStyles } from '@material-ui/styles';
const useStyles = (theme) => {
  modalRemove: {
  }
};
const Invoice = ({
  invoice_id,
  supplier,
  promised_date,
  total_amount,
  payment_status,
  received_status,
  removeInvoice,
  paid_amount,
}) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = React.useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const updateInvoice = () => {
    history.push(`/updateInvoice/${invoice_id}`);
  };
  const viewInvoice = () => {
    history.push(`/viewInvoice/${invoice_id}`);
  };
  return (
    <tr>
      <td>{invoice_id}</td>
      <td>{supplier.supplierName}</td>
      <td>{promised_date}</td>
      <td>{total_amount}</td>
      <td>{paid_amount}</td>
      <td>
        {/* info sucess */}
        <Badge
          pill
          bg={payment_status === 'Not Paid' ? 'md-danger' : 'md-success'}
          text={payment_status === 'Not Paid' ? 'md-danger' : 'md-success'}
        >
          {payment_status}
        </Badge>
      </td>
      <td>
        <Badge
          pill
          bg={received_status === 'Not Received' ? 'md-danger' : 'md-success'}
          text={received_status === 'Not Received' ? 'md-danger' : 'md-success'}
        >
          {received_status}
        </Badge>
      </td>
      <td>
        <button
          onClick={viewInvoice}
          type='button'
          id='supmgr-view'
          className='btn btn-primary'
        >
          View Details
        </button>
      </td>
      <td>
        <button
          type='button'
          id='supmgr-update'
          className='btn btn-success'
          onClick={updateInvoice}
        >
          Update
        </button>
      </td>
      <td>
        <button
          type='button'
          id='supmgr-remove'
          className='btn btn-danger'
          onClick={showModal}
        >
          Remove
        </button>
      </td>
      <Modal
        show={isOpen}
        onHide={hideModal}
        size='sm'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header>
          <Modal.Title>Delete invoice entry </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure about removing this information from the system ?.
        </Modal.Body>
        <Modal.Footer>
          <button onClick={hideModal}>No</button>
          <button
            onClick={(e) => {
              removeInvoice(invoice_id,e);
            }}
          >
            Yes
          </button>
        </Modal.Footer>
      </Modal>
    </tr>
  );
};

export default Invoice;
