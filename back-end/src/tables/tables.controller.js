const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const errorHandler = require("../errors/errorHandler");
const notFound = require("../errors/notFound");

async function list(req, res){
    const result=await service.list();
    res.json({data:result})
}

async function create(req, res){
    const newTable = ({
        table_name,
        capacity,
    }=req.body.data );
    const createdTable = await service.create(newTable);
    res.status(201).json({data:createdTable})
}

function update(reservation_id, table_id) {
    return knex("reservations")
    .where({ reservation_id })
    .update({ status: "seated" })
    .then(() => {
    return knex("tables")
    .where({ table_id })
    .update({ reservation_id })
    .returning("*");
    });
    }

//capacity is less than the  number of people in reservation

//if table is occupied return 400 with error message

async function destroy(req, res) {
    // your solution here
    await service.delete(res.locals.table.table_id);
    res.sendStatus(204);
  }


module.exports = {
    list,
    create,
    update,
    delete: [asyncErrorBoundary(destroy)],
}