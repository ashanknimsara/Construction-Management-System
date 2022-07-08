import axios from 'axios';

const INVOICES_BASE_URL = 'http://localhost:8049/api/v1/invoices';
const ITEMS_BASE_URL = 'http://localhost:8049/api/v1/items';
const SUPPLIERS_BASE_URL = 'http://localhost:8049/api/v1/suppliers';
class SupplierManagerService {
  getInvoiceDetails() {
    return axios.get(INVOICES_BASE_URL);
  }
  getItemsDetails() {
    return axios.get(ITEMS_BASE_URL);
  }
  getSuppliereDetails() {
    return axios.get(SUPPLIERS_BASE_URL);
  }
  updateInvoice(invoice, invoice_code) {
    return axios.put(INVOICES_BASE_URL + '/' + invoice_code, invoice);
  }
  getInvoiceById(invoice_id) {
    return axios.get(INVOICES_BASE_URL + '/' + invoice_id);
  }
  deleteInvoice(invoice_id) {
    return axios.delete(INVOICES_BASE_URL + '/' + invoice_id);
  }
  setInvoiceDetails(invoice){
     return axios.post(INVOICES_BASE_URL,invoice)
  }
}

export default new SupplierManagerService();
