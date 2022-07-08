import React from "react";
import { NavLink } from "react-router-dom";
import "../assets/css/StockMngNavBar.css";

/*implementation */
function StockMngNavBar() {
  return (
    <div class="topnav">
      <NavLink to="items" activeClassName="active">
        Items
      </NavLink>

      <NavLink to="/issue-items" activeClassName="active">
        Issue Items
      </NavLink>

      <NavLink to="/inform-supplier" activeClassName="active">
        Inform Supplier
      </NavLink>
    </div>
  );
}

export default StockMngNavBar;

