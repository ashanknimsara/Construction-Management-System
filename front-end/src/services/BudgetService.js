import axios from 'axios';

const BUDGET_API_BASE_URL = "http://localhost:8060/api/v1/Budget";

class BudgetService{

    getBudget() {
        return axios.get(BUDGET_API_BASE_URL);
    }

    createBudget(budget) {
        return axios.post(BUDGET_API_BASE_URL, budget);
    }

    getBudgetById(pid) {
        return axios.get(BUDGET_API_BASE_URL + '/' + pid);
    }

    updateBudget(budget, pid) {
        return axios.put(BUDGET_API_BASE_URL + '/' + pid, budget);
    }

    deleteBudget(pid){
        return axios.delete(BUDGET_API_BASE_URL + '/' + pid);
    }

    

}

export default new BudgetService()