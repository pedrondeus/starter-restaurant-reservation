import React from "react";

import { Redirect, Route, Switch, useParams } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import NewReservations from "../reservationsComponents/NewReservations";

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
        <Redirect to={"/dashboard?date=:reservationDate"} />
      </Route>
      <Route exact={true} path="/reservations?date=:reservationDate">
        <Redirect to={"/dashboard?date=:reservationDate"} />
      </Route>
      <Route path="/dashboard?date=:reservationDate">
        <Dashboard date={today()} />
      </Route>
      <Route path='/reservations/new'>
        <NewReservations />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
