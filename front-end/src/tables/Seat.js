import React, { useEffect, useState } from "react";
import { listTables, createTables } from "../utils/api";
import { useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { BrowserRouter as Router, Link, Route, Switch,useRouteMatch} from "react-router-dom";

function Seat() {
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const history= useHistory()
  
    useEffect(loadDashboard, []);

  function loadDashboard() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setTablesError);
    return () => abortController.abort();
  }

  const handleSubmit = () => {

    history.push(`dashboard`)
  }


  let tablesOptions = tables.map((table) => {
    if(table.reservation_id === null){
        return (
            <option>{table.table_name} - {table.capacity}</option>

        )

    }
  })

  //Table number: <select name="table_id" />. The text of each option must be {table.table_name} - {table.capacity} so the tests can find the options.

  //do not seat a reservation with more people than the capacity of the table

  //display a Submit button that, when clicked, assigns the table to the reservation then displays the /dashboard page

  //PUT to /tables/:table_id/seat/ in order to save the table assignment. The body of the request must be { data: { reservation_id: x } } where X is the reservation_id of the reservation being seated. The tests do not check the body returned by this request.

  //display a Cancel button that, when clicked, returns the user to the previous page

  return (
    <div>
      <ErrorAlert error={tablesError} />
        <select class="form-select" aria-label="Default select example" name="table_id">
            <option selected>Open this select menu</option>
            {tablesOptions}
        </select>
        <button onClick={handleSubmit}></button>
    </div>
  );
}

export default Seat;