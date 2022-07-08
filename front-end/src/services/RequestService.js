
import axios from "axios";

const REQUEST_API_BASE_URL = "http://localhost:8049/api/v1/request/";

function getAllRequests(){
  return axios.get(REQUEST_API_BASE_URL);
};

function createRequest(request){
  return axios.post(`${REQUEST_API_BASE_URL}`,request);
};

function getRequestById(qId){
  return axios.get(`${REQUEST_API_BASE_URL}${qId}`);
};

function updateRequest (request, requestId){
  return axios.put(`${REQUEST_API_BASE_URL}${requestId}`, request);
};

function deleteRequest(requestId){
  return axios.delete(`${REQUEST_API_BASE_URL}${requestId}`);
};

export default {getAllRequests,
  createRequest,
  getRequestById,
  updateRequest,
  deleteRequest};