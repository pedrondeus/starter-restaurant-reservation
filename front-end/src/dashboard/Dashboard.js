import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  const [currentDate, setCurrentDate] = useState(date)
  

  useEffect(() => {
    loadDashboard()
  }, [currentDate]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    //listReservations({ date }, abortController.signal)
    getReservationsByDate(currentDate, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  console.log("reservation", reservations)
  console.log("date", currentDate)
  console.log("next Date", next(currentDate))

  if(date === today()){
    return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
      <button onClick ={() => currentDate=next(currentDate)}>Next</button>
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
        <button onClick ={() => setCurrentDate(previous(currentDate))}>previous</button>
        <button onClick ={() => setCurrentDate(next(currentDate))}>next</button>
      </main>
    );
  }

}

export default Dashboard;
