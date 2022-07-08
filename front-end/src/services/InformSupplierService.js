import axios from 'axios';
const INFORM_ITEMS_BASE_URL = 'http://localhost:8049/api/v1/informSupplier';
class InformSupplierService {
    getInformItems() {
        return axios.get(INFORM_ITEMS_BASE_URL);
    }
     addInformItem(informSupplier){
        return axios.post(INFORM_ITEMS_BASE_URL,informSupplier);
    }
    
    deleteInformItem(inform_id) {
        return axios.delete(`${INFORM_ITEMS_BASE_URL}/${inform_id}`);
    }
    getInformItemById(inform_id) {
        return axios.get(INFORM_ITEMS_BASE_URL+'/'+inform_id);
    }
    editInformItem(informSupplier, inform_id){
        return axios.put(INFORM_ITEMS_BASE_URL+'/'+inform_id,informSupplier);
    }
}
export default new InformSupplierService();

