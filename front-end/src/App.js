import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import {
//   ListSalaryComponent,
//   CreateSalaryComponent,
//   UpdateSalaryComponent,
//   ListItemComponent,
//   CreateItem,
//   UpdateItemComponent,
//   CreateMachineComponent,
//   ListMachineComponent,
//   UpdateMachineComponent,
// } from "./components/";
import ListBudgetComponent from './components/ListBudgetComponent';
import CreateBudgetComponent from './components/CreateBudgetComponent';
import UpdateBudgetComponent from './components/UpdateBudgetComponent';
import ListExpenseComponent from './components/ListExpenseComponent';
import CreateExpenseComponent from './components/CreateExpenseComponent';
import UpdateExpenseComponent from './components/UpdateExpenseComponent';
import ExpensesReport from './components/ExpensesReport';

import LogIn from "./pages/LogIn";
import QuotationRequest from "./components/QuotationRequestManager/QuotationRequest";
import QuotationProcessIntro from "./pages/QuotationProcessIntro";
import ViewQuotationRequestsComponent from "./components/QuotationRequestManager/ViewQuotationRequestsComponent";
import CreateQuotationComponent from "./components/QuotationManager/CreateQuotationComponent";
import RespondToQuotationComponent from "./components/QuotationManager/RespondToQuotationComponent"
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/request-quotation">
            <QuotationRequest></QuotationRequest>
          </Route>
          <Route path="/quotation-process-intro">
            <QuotationProcessIntro></QuotationProcessIntro>
          </Route>
          <Route path="/login">
            <LogIn></LogIn>
          </Route>
          <Route path="/view-quotation-requests">
            <ViewQuotationRequestsComponent/>
          </Route>
          <Route path="/create-quotation">
            <CreateQuotationComponent/>
          </Route>
          <Route path="/respond-to-quotation">
            <RespondToQuotationComponent/>
          </Route>
          {/* <Route exact path="/viewInvoice/:invoice_id">
            <ViewInvoiceComponent />
          </Route>
          <Route path="/salaries" component={ListSalaryComponent}></Route>
          <Route path="/add-salary" component={CreateSalaryComponent}></Route>
          <Route
            path="/update-salary/:id"
            component={UpdateSalaryComponent}
          ></Route>
          <Route exact path="/" component={ListItemComponent} />
          <Route exact path="/items" component={ListItemComponent} />
          <Route exact path="/add-item" component={CreateItem} />
          <Route
            exact
            path="/edit-item/:item_code"
            component={UpdateItemComponent}
          />

          <Route path="/" exact component={ListMachineComponent}></Route>
          <Route path="/machines" component={ListMachineComponent}></Route>
          <Route path="/add-Machine" component={CreateMachineComponent}></Route>
          <Route
            path="/update-Machine/:id"
            component={UpdateMachineComponent}
          ></Route>
          <StatsBar />
          <ListItemComponent />
          <Route path ="/" exact component = {ListEmployeeComponent}></Route>
          <Route path="/employee" component={ListEmployeeComponent}></Route>
          <Route
            path="/add-employee"
            component={CreateEmployeeComponent}
          ></Route>
          <Route
            path="/update-employee/:id"
            component={UpdateEmployeeComponent}
          ></Route> */}
          
        
          <Route path ="/" exact component = {ListBudgetComponent}></Route>
          <Route path ="/Budget"  component = {ListBudgetComponent}></Route>                        
          <Route path ="/add-budget"  component = {CreateBudgetComponent}></Route> 
          <Route path ="/update-budget/:pid"  component = {UpdateBudgetComponent}></Route> 
          <Route path ="/ListExpenseComponent"  component = {ListExpenseComponent}></Route> 
          <Route path ="/CreateExpenseComponent"  component = {CreateExpenseComponent}></Route>                        
          <Route path ="/UpdateExpenseComponent/:expenseId"  component = {UpdateExpenseComponent}></Route>                        
          <Route path ="/ExpensesReport"  component = {ExpensesReport}></Route>  
  
          
        </Switch>
      </Router>
    </>
  );
}

export default App;
