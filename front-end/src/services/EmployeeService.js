import axios from 'axios';

const EMPLOYEES_API_BASE_URL = "http://localhost:8060/api/v1/employee";

class EmployeeService {
    getEmployees() {
        return axios.get(EMPLOYEES_API_BASE_URL);
    }

    createEmployee(employee) {
        return axios.post(EMPLOYEES_API_BASE_URL, employee);
    }

    getEmployeeById(employeeId) {
        return axios.get(EMPLOYEES_API_BASE_URL + '/' + employeeId);
    }

    UpdateEmployee(employee, employeeId) {
        return axios.put(EMPLOYEES_API_BASE_URL + '/' + employeeId, employee)
    }

    deleteEmployee(employeeId) {
        return axios.delete(EMPLOYEES_API_BASE_URL + '/' + employeeId)
    }
}

export default new EmployeeService()