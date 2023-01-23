import React, { useState} from "react";
import { useHistory  } from "react-router-dom";
import { createReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today } from "../utils/date-time";


function NewReservations({ Reservations }) {

    let history = useHistory();
    
    const [error, setError] = useState(null);
    const[reservation, setReservation] = useState({
        first_name: '',
        last_name: '',
        mobile_number: '',
        reservation_date: '',
        reservation_time: '',
        people: '1',
    })


    const handleChange = ({ target }) => {
        setReservation({
            ...reservation,
            [target.name]: target.value
        })
    }

    function handleSubmit(e){
        createReservations(reservation).then(() => {
            history.push("/")//has to be page of the reservation just created
        })
        .catch(setError)
    }


    return (
        <main>
            <ErrorAlert error={error} />
            <form name="create" onSubmit={handleSubmit}>
                <div class="form-group">
                    <label for="exampleFormControlInput1">First Name</label>
                    <input name="first_name" type="name" class="form-control" onChange={handleChange} value={reservation.first_name} required={true} />
                </div>
                <div class="form-group">
                    <label for="exampleFormControlInput1">Last Name</label>
                    <input name="last_name" type="name" class="form-control" onChange={handleChange} value={reservation.last_name} required={true}  />
                </div>
                <div class="form-group">
                    <label for="exampleFormControlInput1">Mobile Number</label>
                    <input name="mobile_number" type="phone-number" class="form-control" onChange={handleChange} value={reservation.mobile_number} required={true}  />
                </div>
                <div class="form-group">
                    <label for="exampleFormControlInput1">Reservation Date</label>
                    <input name="reservation-date" type="date" min={today()} max="2035-12-12" class="form-control" onChange={handleChange} value={reservation.reservation_date} required={true} />
                </div>
                <div class="form-group">
                    <label for="exampleFormControlInput1">Reservation Time</label>
                    <input name="reservation-time" type="time" class="form-control" onChange={handleChange} value={reservation.reservation_time} required={true} />
                </div>
                <div class="form-group">
                    <label for="exampleFormControlInput1">Number of people</label>
                    <input name="people" type="number" class="form-control"  min="1" max="50" onChange={handleChange} value={reservation.people} required={true} />
                </div>


                <button type="submit" className="btn btn-primary">Submit</button>
                <button onClick={() => {history.push('/')}}>Cancel</button>

            </form>
        </main>
    );
}

export default NewReservations;