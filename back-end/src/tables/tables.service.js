const knex = require("../db/connection");

function list(){
    return knex("tables").select("*")
}

function search(mobile_number) {
    return knex("reservations")
      .whereRaw(
        "translate(mobile_number, '() -', '') like ?",
        `%${mobile_number.replace(/\D/g, "")}%`
      )
      .orderBy("reservation_date");
  }

function create(table){
    return knex("tables").insert(table, "*").then((createdTable) => createdTable[0])
}

function update(tableId,reservationId){
    return knex("tables")
        .select("*")
        .where({"table_id":tableId})
        .update( reservationId,"reservation_id")
}

async function update(req, res) {
    const { reservation_id } = req.body.data;
    const table_id = Number(req.params.table_id);
    const data = await service.update(reservation_id, table_id);
    res.json({ data });
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

module.exports = {
    list,
    create,
    update,
    delete: destroy,
}