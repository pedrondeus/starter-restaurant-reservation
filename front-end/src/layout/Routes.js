import React from "react";

import { Redirect, Route, Switch, useParams } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import NewReservations from "../reservationsComponents/NewReservations";
import NewTable from "../tables/NewTable";
import Seat from "../tables/Seat";
import Search from "../searchForm/Search";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path='/reservations/new'>
        <NewReservations />
      </Route>
      <Route path='/tables/new'>
        <NewTable />
      </Route>
      <Route path='/reservations/:reservation_id/seat'>
        <Seat />
      </Route>
      <Route path='/search'>
        <Search />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
