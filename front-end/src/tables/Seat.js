import React, { useEffect, useState } from "react";
import { listTables, seatReservation } from "../utils/api";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";

function Seat() {
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const history= useHistory()
  const [seatError, setSeatError] = useState(null);
  const reservation_id = useParams()
  const initialFormState = {
    table_id:"",
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  
  useEffect(loadDashboard, []);
  
  function loadDashboard() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal)
    .then(setTables)
    .catch(setTablesError);
    return () => abortController.abort();
  }

  let tablesOptions = tables.map((table) => {
    if(table.reservation_id === null){
        return (
            <option key={table.table_id} value={table.table_id}>{table.table_name} - {table.capacity}</option>
        )
    }
  })
  
  const handleChange = ({target}) => {
    const value = target.value;
    setFormData({
      ...formData,
      [target.name]:value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const tableId = formData.table_id;

    setSeatError(null)
    const response=await seatReservation(tableId, {reservation_id});
    const savedData=await response.json();
    setSeatError(Error(savedData.error));
    if(!savedData.error){
      history.push('/dashboard')
    }
    
  }

  const handleCancel = (event) => {
    event.preventDefault();
    history.goBack();
  }





  //Table number: <select name="table_id" />. The text of each option must be {table.table_name} - {table.capacity} so the tests can find the options.

  //do not seat a reservation with more people than the capacity of the table

  //display a Submit button that, when clicked, assigns the table to the reservation then displays the /dashboard page

  //PUT to /tables/:table_id/seat/ in order to save the table assignment. The body of the request must be { data: { reservation_id: x } } where X is the reservation_id of the reservation being seated. The tests do not check the body returned by this request.

  //display a Cancel button that, when clicked, returns the user to the previous page

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <ErrorAlert error={tablesError} />
      <label>
        <select class="form-select" aria-label="Default select example" name="table_id" id="table_id" onChange={handleChange} value={formData.table_id} >
            <option selected>-- Select a Table --</option>
            {tablesOptions}
        </select>
      </label>
      <br />
      <ErrorAlert error={seatError} />
      <br />
      <button type="submit">Submit</button>
      <br />
      <button type="cancel" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default Seat;