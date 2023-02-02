const knex = require("../db/connection");

function list(){
    return knex("reservations").select("*");
}

function read(date){
    return knex("reservations").select("*").where({"reservation_date": date})
}

function create(reservation){
    console.log("service", reservation)
    return knex("reservations").insert(reservation, "*").then((createdReservation) => createdReservation[0])
}

module.exports = {
    list,
    read,
    create,
}