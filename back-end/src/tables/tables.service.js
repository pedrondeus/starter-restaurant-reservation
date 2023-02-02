const knex = require("../db/connection");

function list(){
    return knex("tables").select("*")
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

async function destroy(tableId){
    return knex("tables").where({table_id: tableId}).del()
}

module.exports = {
    list,
    create,
    update,
    delete: destroy,
}