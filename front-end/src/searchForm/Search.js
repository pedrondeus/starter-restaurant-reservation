import React, { useState, useEffect} from "react";
import { useHistory  } from "react-router-dom";
import { searchReservation, listReservationsByPhone } from "../utils/api";
import useQuery from "../utils/useQuery";
import ErrorAlert from "../layout/ErrorAlert";
import { today } from "../utils/date-time";


function Search() {
    const [reservations, setReservations] = useState([]);
    const [reservationsError, setReservationsError] = useState(null);
    const query = useQuery()
    const [phoneNumber, setPhoneNumber] = useState(query.get("mobile_number") || "");
    const history = useHistory();


    const handleChange = ({target}) => {
        setPhoneNumber(target.value)
    }

    async function handleSubmit(e){
        e.preventDefault()
        console.log("phone number =", phoneNumber)
        const abortController = new AbortController();
        try {
            const response = await searchReservation(phoneNumber, abortController.signal)
            setReservations(response)
        } catch(err) {
            setReservationsError(err)
        }
        return () => abortController.abort()
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
            <br/>
          </div>
        )
      })

    return (
        <main>
            <form name="seat-reservation" onSubmit={handleSubmit}>
            <div class="form-group">
                <div class="md-form active-purple active-purple-2 mb-3">
                    <input name="mobile_number" class="form-control" type="text" placeholder="Enter a customer's phone number" aria-label="Search" onChange={handleChange} value={phoneNumber}  />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
            </form>
            {listOfReservations}
        </main>
    );
}

export default Search;