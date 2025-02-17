import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import useQuery from "../utils/useQuery";
import { getReservationsByDate } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today, next, previous } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function ListByDate() {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const query = useQuery()
  const [date, setDate] = useState(query.get("date") || today())
  const history = useHistory();

  useEffect(() => {
    loadDashboard()
  }, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    getReservationsByDate(date, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const nextHandler = () => {
    setDate(next(date))
    history.push(`dashboard?date=${next(date)}`)
  }

  const previousHandler = () => {
    setDate(previous(date))
    history.push(`dashboard?date=${previous(date)}`)
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
            <div class="col-sm-4">Reservation Time:</div><div class="col-sm-8">{reservation.reservation_time}</div>
        </div>
        <div class="row">
            <div class="col-sm-4">Number of people:</div><div class="col-sm-8">{reservation.people}</div>
        </div>
        <br/>
      </div>
    )
  })


  if(date === today()){
    return (
        <div>
            <div className="d-md-flex mb-3">
                <h4 className="mb-0">Reservations for date: </h4><h4>{date}</h4>
            </div> 
            <ErrorAlert error={reservationsError} />
            {listOfReservations}
            <button onClick ={nextHandler}>Next</button>
        </div>
  );
  } else { 
    return (
      <div>
        <div className="d-md-flex mb-3">
          <h4 className="mb-0">Reservations for date: </h4><h4>{date}</h4>
        </div>
        <ErrorAlert error={reservationsError} />
        {}
        {listOfReservations}
        <button onClick ={previousHandler}>previous</button>
        <button onClick ={nextHandler}>next</button>
      </div>
    );
  }

}

export default ListByDate;
