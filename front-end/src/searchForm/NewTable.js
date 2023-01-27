import React, { useState} from "react";
import { useHistory  } from "react-router-dom";
import { createReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today } from "../utils/date-time";


function NewTable() {

    let history = useHistory();
    
    const [error, setError] = useState(null);
    const[table, setTable] = useState({
        table_name: '',
        capacity: '1',
    })

    const handleChange = ({ target }) => {
        setTable({
            ...table,
            [target.name]: target.value
        })
    }

    async function handleSubmit(e){
        e.preventDefault()
        const abortController = new AbortController();
        try {
            //create table function?
/*             const response = await createReservations(reservation, abortController.signal)
            history.push(`/dashboard?date=${reservation.reservation_date}`)
            console.log(response);
            return response; */
        } catch(err) {
            setError(err)
        }
        return () => abortController.abort()
    }


    return (
        <main>
            <form>
            <div class="form-group">
                    <label for="exampleFormControlInput1">Table Name:</label>
                    <input name="table_name" type="name" className="form-control"  min="2"  id="table_name" onChange={handleChange} value={table.table_name} required={true} />
            </div>
            <div class="form-group">
                    <label for="exampleFormControlInput1">Capacity:</label>
                    <input name="capacity" type="number" className="form-control"  min="1"  id="capacity" onChange={handleChange} value={table.capacity} required={true} />
            </div>



                <button type="submit" className="btn btn-primary">Submit</button>
                <button onClick={() => {history.push('/')}}>Cancel</button>
            </form>
        </main>
    );
}

export default NewTable;