import axios from 'axios';

const MACHINE_API_BASE_URL = 'http://localhost:8080/api/v1/machines';

class MachineService {
  getMachines() {
    return axios.get(MACHINE_API_BASE_URL);
  }

  createMachine(machine) {
    return axios.post(MACHINE_API_BASE_URL, machine);
  }

  getMachineById(id) {
    return axios.get(MACHINE_API_BASE_URL + '/' + id);
  }
  updateMachine(machine, id) {
    return axios.put(MACHINE_API_BASE_URL + '/' + id, machine);
  }
  deleteMachine(id) {
    return axios.delete(MACHINE_API_BASE_URL + '/' + id);
  }
}
export default new MachineService();
