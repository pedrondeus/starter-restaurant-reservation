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

async function destroy(req, res) {
  // your solution here
  await service.delete(res.locals.table.table_id);
  res.sendStatus(204);
}

async function update(req, res) {
    const { reservation_id } = req.body.data;
    const table_id = Number(req.params.table_id);
    const data = await service.update(reservation_id, table_id);
    res.json({ data });
    }

//capacity is less than the  number of people in reservation
async function checkTableCapacity(req, res, next){
  const people = res.locals.reservation.people;
  const capacity = res.locals.table.capacity;
  if(capacity >= people){
    return next()
  }
  next({status:404, message: `Choose a table with with higher capacity.`})
}

//if table is occupied return 400 with error message
async function isTableOccupied(req, res, next){
  const status = res.locals.table.reservation_id;
  if(!status){
    return next()
  }
  next({status:404, message: `The table is occupied.`})
}

  async function reservationExists(req, res, next) {
    const reservation = await service.readReservation(res.locals.table.reservation_id);
    console.log("reservation is", reservation);
    if (reservation) {
      res.locals.reservation = reservation;
      return next();
    }
    next({ status: 404, message: `Reservation cannot be found.` });
  }

  async function tableExists(req, res, next){
    const table = await service.read(req.params.table_id)
    console.log("table is", table);
    if(table){
        res.locals.table = table;
        return next();
    }
    next({ status: 404, message: `Table cannot be found.` });
  }

module.exports = {
    list,
    create,
    update: [tableExists, reservationExists, checkTableCapacity, isTableOccupied, update],
    delete: [tableExists, asyncErrorBoundary(destroy), destroy],
}