const knex = require("../db/connection");

function list(){
    return knex("tables").select("*")
}

function create(table){
    return knex("tables").insert(table, "*").then((createdTable) => createdTable[0])
}

function update(reservationId){
    return knex("tables")
        .select("*")
        .where({"table_id":})
}

module.exports = {
    list,
    create,
}