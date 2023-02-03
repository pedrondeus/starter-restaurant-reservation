import React from "react";
import ListByDate from "../reservationsComponents/ListByDate";
import ListAllReservations from "../reservationsComponents/ListAllReservations";
import ListOfTables from "../tables/ListOfTables";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
    return (
      <main>
        <h1>Dashboard</h1>
        <ListByDate />
        <ListAllReservations />
        <ListOfTables />
      </main>
    );
}

export default Dashboard;
