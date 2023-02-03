import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import { useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { BrowserRouter as Link} from "react-router-dom";

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
        <div class="row">
            <div class="col-sm-4">Status:</div><div class="col-sm-8">{reservation.status}</div>
        </div>
        <Link to={`/reservations/${reservation.reservation_id}/seat`}>
        <button>Seat</button>
        </Link>
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