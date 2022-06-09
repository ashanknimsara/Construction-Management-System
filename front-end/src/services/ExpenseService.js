import axios from 'axios';

const EXPENSE_API_BASE_URL = "http://localhost:8060/api/v1/Expenses";
//const BUDGET_API_BASE_URL = "http://localhost:8060/api/v1/Budget";

       

class ExpenseService{

    viewExpenses(){
        return axios.get(EXPENSE_API_BASE_URL);
    }

    createExpense(expenses){
        return axios.post(EXPENSE_API_BASE_URL, expenses);
    }

    getExpenseById(expenseId){
        return axios.get(EXPENSE_API_BASE_URL + '/' + expenseId);
    }

    updateExpense(expenses, expenseId){
        return axios.put(EXPENSE_API_BASE_URL + '/' + expenseId, expenses);
    }

    deleteExpenses(expenseId){
        return axios.delete(EXPENSE_API_BASE_URL + '/' + expenseId);
    }
}

export default new ExpenseService()
