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

function update(reservation_id){
    return knex("reservations")
    .where({ reservation_id })
    .update({ status: "seated" })
}

module.exports = {
    list,
    read,
    create,
    update,
}