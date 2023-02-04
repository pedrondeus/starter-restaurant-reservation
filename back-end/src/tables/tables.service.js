const knex = require("../db/connection");

function readReservation(reservation_id){
    return knex("reservations")
        .select("*")
        .where({reservation_id})
}

function list(){
    return knex("tables").select("*")
}

function create(table){
    return knex("tables").insert(table, "*").then((createdTable) => createdTable[0])
}

function update(table_id, reservation_id) {
    return knex("reservations")
    .where({ reservation_id })
    .update({ status: "seated" })
    .then(() => {
    return knex("tables")
    .where({ table_id })
    .update({ reservation_id})
    .returning("*");
    });
    }

async function destroy(table_id, reservation_id){
    return knex("reservations")
        .where({reservation_id})
        .update({status: "finished"})
        .returning("*")
        .then(() => {
            return knex("tables")
                .where({table_id})
                .update({reservation_id: null})
                .returning("*")
        })
}

async function read(tableId){
    return knex("tables")
        .select("*")
        .where({"table_id":tableId})
        .first()
}

module.exports = {
    read,
    readReservation,
    list,
    create,
    update,
    delete: destroy,
}