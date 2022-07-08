import axios from 'axios';

const SALARY_API_BASE_URL = 'http://localhost:8080/api/v1/salaries';

class SalaryService {
  getSalaries() {
    return axios.get(SALARY_API_BASE_URL);
  }

  createSalary(salary) {
    return axios.post(SALARY_API_BASE_URL, salary);
  }

  getSalaryById(salId) {
    return axios.get(SALARY_API_BASE_URL + '/' + salId);
  }

  updateSalary(salary, salary_id) {
    return axios.put(SALARY_API_BASE_URL + '/' + salary_id, salary);
  }

  deleteSalary(salId) {
    return axios.delete(SALARY_API_BASE_URL + '/' + salId);
  }
}

export default new SalaryService();
