
import axios from "axios";

const REQUEST_API_BASE_URL = "http://localhost:8049/api/v1/quotation/";

function getAllQuotations(){
  return axios.get(REQUEST_API_BASE_URL);
};

function createQuotation(quotation){
  return axios.post(`${REQUEST_API_BASE_URL}`,quotation);
};

function getQuotationById(qId){
  return axios.get(`${REQUEST_API_BASE_URL}${qId}`);
};

function updateQuotation (quotation, quotationId){
  return axios.put(`${REQUEST_API_BASE_URL}${quotationId}`, quotation);
};

function deleteQuotation(quotationId){
  return axios.delete(`${REQUEST_API_BASE_URL}${quotationId}`);
};

export default {getAllQuotations,
  createQuotation,
  getQuotationById,
  updateQuotation,
  deleteQuotation};