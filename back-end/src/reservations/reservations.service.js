const { where } = require("../db/connection");
const knex = require("../db/connection");

function list(){
    return knex("reservations").select("*");
}

function read(date){
    return knex("reservations").select("*").where({"reservation_date": date})
}


module.exports = {
    list,
    read,
}