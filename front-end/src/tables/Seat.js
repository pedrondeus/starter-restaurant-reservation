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
    try {
      const response=await seatReservation(tableId, {reservation_id});
      history.push('/dashboard')
    } catch(err){
      setSeatError(err);
    }   
  }

  const handleCancel = (event) => {
    event.preventDefault();
    history.goBack();
  }

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