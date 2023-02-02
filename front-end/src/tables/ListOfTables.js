import React, { useEffect, useState } from "react";
import { listTables, removeTableAssignment } from "../utils/api";
import { useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { BrowserRouter as Router, Link, Route, Switch,useRouteMatch} from "react-router-dom";

function ListOfTables() {
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const history= useHistory()
  //const userRouterMatch()

    useEffect(loadDashboard, []);

  function loadDashboard() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setTablesError);
    return () => abortController.abort();
  }

  let listOfTables = tables.map((table) => {
    if(table.reservation_id === null){
        return (
          <div>
          <div class="row">
            <div class="col-sm-4">{table.table_name}</div>
            <div class="col-sm-4">Free</div>
          </div>
          <br/>
        </div>
          )    
    } else {
        return (
            <div>
              <div class="row">
                <div class="col-sm-4">{table.table_name}</div>
                <div class="col-sm-4">
                  Occupied
                </div>
                <button class="btn btn-large btn-primary" data-toggle="confirmation" data-title="Is this table ready to seat new guests? This cannot be undone." onClick={() => {removeTableAssignment(table.table_id), history.push(`dashboard`)}}>Finish</button>
              </div>
              <br/>
            </div>

        )

    }
  })

  return (
    <div>
      <ErrorAlert error={tablesError} />
      {listOfTables}
    </div>
  );
}

export default ListOfTables;