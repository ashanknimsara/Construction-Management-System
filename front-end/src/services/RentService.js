import axios from 'axios';

const RENT_API_BASE_URL = 'http://localhost:8080/api/v1/rents';

class RentService {
  getRents() {
    return axios.get(RENT_API_BASE_URL);
  }

  createRent(rent) {
    return axios.post(RENT_API_BASE_URL, rent);
  }

  getRentById(id) {
    return axios.get(RENT_API_BASE_URL + '/' + id);
  }
  deleteRent(id) {
    return axios.delete(RENT_API_BASE_URL + '/' + id);
  }
 
}
export default new RentService();
