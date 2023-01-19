import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { listReservations, getReservationsByDate } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today, next, previous } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  let currentDate = useParams();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    //listReservations({ date }, abortController.signal)
    getReservationsByDate({ currentDate }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  console.log("date", currentDate)
  console.log("next Date", next(date))

  if(date === today()){
    return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
      <button onClick ={() => currentDate=next(date)}>Next</button>
    </main>
  );
  } else { 
    return (
      <main>
        <h1>Dashboard</h1>
        <div className="d-md-flex mb-3">
          <h4 className="mb-0">Reservations for date</h4>
        </div>
        <ErrorAlert error={reservationsError} />
        {JSON.stringify(reservations)}
        <button onClick ={() => currentDate=previous(date)}>previous</button>
        <button onClick ={() => currentDate=next(date)}>next</button>
      </main>
    );
  }

}

export default Dashboard;
