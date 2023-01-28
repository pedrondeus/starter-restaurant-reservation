import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import { useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function ListAllReservations() {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
    const history= useHistory()
  useEffect(loadDashboard, []);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations(abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const handleSubmit = () => {
    history.push(`dashboard`)
  }

  let listOfReservations = reservations.map((reservation) => {
    
    return (
      <div>
        <div class="row">
          <div class="col-sm-4">First Name:</div><div class="col-sm-8">{reservation.first_name}</div>
        </div>
        <div class="row">
            <div class="col-sm-4">Last Name:</div><div class="col-sm-8">{reservation.last_name}</div>
        </div>
        <div class="row">
            <div class="col-sm-4">Mobile Number:</div><div class="col-sm-8">{reservation.mobile_number}</div>
        </div>
        <div class="row">
            <div class="col-sm-4">Reservation Date:</div><div class="col-sm-8">{reservation.reservation_date}</div>
        </div>
        <div class="row">
            <div class="col-sm-4">Reservation Time:</div><div class="col-sm-8">{reservation.reservation_time}</div>
        </div>
        <div class="row">
            <div class="col-sm-4">Number of people:</div><div class="col-sm-8">{reservation.people}</div>
        </div>
        <button>Seat</button>
        <br/>
      </div>
    )
  })

  return (
    <div>
      <ErrorAlert error={reservationsError} />
      {listOfReservations}
    </div>
  );
}

export default ListAllReservations;