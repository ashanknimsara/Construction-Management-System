import axios from 'axios';
const ITEMS_BASE_URL = 'http://localhost:8049/api/v1/items';
class StockManagerService {
    getItems() {
        return axios.get(ITEMS_BASE_URL);
    }
     addItem(item){
        return axios.post(ITEMS_BASE_URL,item);
    }
    
    deleteItem(itemId) {
        return axios.delete(`${ITEMS_BASE_URL}/${itemId}`);
    }
    getItemById(itemId) {
        return axios.get(ITEMS_BASE_URL+'/'+itemId);
    }
}
export default StockManagerService;

