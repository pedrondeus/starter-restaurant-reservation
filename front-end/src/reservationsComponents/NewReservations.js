import React, { useState} from "react";
import { useHistory  } from "react-router-dom";
import { createReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function NewReservations() {

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

    async function handleSubmit(e){
        e.preventDefault()
        const abortController = new AbortController();
        try {
            const response = await createReservations(reservation, abortController.signal)
            history.push(`/dashboard?date=${reservation.reservation_date}`)
            console.log(response);
            return response;
        } catch(err) {
            setError(err)
        }
        return () => abortController.abort()
    }


    return (
        <main>
            <ErrorAlert error={error} />
            <form name="create" onSubmit={handleSubmit}>
                <div class="form-group">
                    <label for="exampleFormControlInput1">First Name</label>
                    <input name="first_name" type="name" className="form-control" id="first_name" onChange={handleChange} value={reservation.first_name} required={true} />
                </div>
                <div class="form-group">
                    <label for="exampleFormControlInput1">Last Name</label>
                    <input name="last_name" type="name" className="form-control" id="last_name" onChange={handleChange} value={reservation.last_name} required={true}  />
                </div>
                <div class="form-group">
                    <label for="exampleFormControlInput1">Mobile Number</label>
                    <input name="mobile_number" type="tel" className="form-control" id="mobile_number" onChange={handleChange} value={reservation.mobile_number} required={true}  />
                </div>
                <div class="form-group">
                    <label for="exampleFormControlInput1">Reservation Date</label>
                    <input type="date"name="reservation_date" className="form-control" id="reservation_date" pattern="\d{4}-\d{2}-\d{2}" onChange={handleChange} value={reservation.reservation_date} required />
                </div>
                <div class="form-group">
                    <label for="exampleFormControlInput1">Reservation Time</label>
                    <input name="reservation_time" type="time" className="form-control" pattern="[0-9]{2}:[0-9]{2}" onChange={handleChange} value={reservation.reservation_time} required={true} />
                </div>
                <div class="form-group">
                    <label for="exampleFormControlInput1">Number of people</label>
                    <input name="people" type="number" className="form-control"  min="1" max="50" id="people" onChange={handleChange} value={reservation.people} required={true} />
                </div>


                <button type="submit" className="btn btn-primary">Submit</button>
                <button onClick={() => {history.push('/')}}>Cancel</button>

            </form>
        </main>
    );
}

export default NewReservations;