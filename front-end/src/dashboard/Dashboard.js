import React, { useState } from "react";
import { useHistory } from "react-router";
import useQuery from "../utils/useQuery";
import ListByDate from "../reservationsComponents/ListByDate";
import ListAllReservations from "../reservationsComponents/ListAllReservations";
import { today } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  //const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const query = useQuery()
  const [date, setDate] = useState(query.get("date") || today())
  const history = useHistory();

 

    return (
      <main>
        <h1>Dashboard</h1>
        <ListByDate />
        <ListAllReservations />
      </main>
    );
}

export default Dashboard;
