import React, { useState, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';
import SupplierDetailsComponent from './SupplierDetailsComponent';
import InvoiceItemsComponent from './InvoiceItemsComponent';
import InvoiceDetailsComponent from './InvoiceDetailsComponent';
import InvoiceConfirmation from './InvoiceConfirmationComponent';
import moment from 'moment';

const InvoiceFormComponent = () => {
  const { allSuppliers, allItems } = useFetch();
  const [nvalidSupplier, setValidSupplier] = useState(false);
  const [nvalidItems, setValidItems] = useState(false);
  const [nvalidOther, setValidOther] = useState(false);
  const [invoice, setInvoice] = useState({
    description: '',
    promised_date: '',
    issued_date: moment().utcOffset('+05:30').format('MM/DD/YYYY').toString(),
    paid_amount: 0,
    total_amount: 0,
    payment_status: '',
    received_status: 'Not Received',
    supplier: { ...allSuppliers[0] },
    items: [],
  });
  const handleValidSupplier = () => {
    setValidSupplier(true);
  };
  const handleValidItems = () => {
    setValidItems(true);
  };
  const handleValidOther = () => {
    setValidOther(true);
  };
  const [step, setStep] = useState(1);
  //
  useEffect(() => {
    console.log(invoice.supplier);
  });
  //proceed to next step
  const nextStep = () => {
    setStep((prevstep) => prevstep + 1);
    console.log(step);
  };
  //proceed to previous step
  const prevStep = () => {
    setStep(() => step - 1);
  };
  //
  const handleChange = (input, value) => {
    setInvoice({ ...invoice, [input]: value });
  };

  switch (step) {
    case 1:
      return (
        <SupplierDetailsComponent
          allSuppliers={allSuppliers}
          nextStep={nextStep}
          invoice={invoice}
          nvalidSupplier={nvalidSupplier}
          handleValidSupplier={handleValidSupplier}
          handleChange={handleChange}
        />
      );
    case 2:
      return (
        <InvoiceItemsComponent
          allItems={allItems}
          nextStep={nextStep}
          prevStep={prevStep}
          nvalidItems={nvalidItems}
          handleValidItems={handleValidItems}
          invoice={invoice}
          handleChange={handleChange}
        />
      );
    case 3:
      return (
        <InvoiceDetailsComponent
          selectedItems={invoice.items}
          nextStep={nextStep}
          prevStep={prevStep}
          nvalidOther={nvalidOther}
          handleValidOther={handleValidOther}
          invoice={invoice}
          handleChange={handleChange}
        />
      );
    case 4:
      return (
        <InvoiceConfirmation
          invoiceDetails={invoice}
          supplierDetails={invoice.supplier}
          prevStep={prevStep}
        />
      );
  }
};

export default InvoiceFormComponent;
