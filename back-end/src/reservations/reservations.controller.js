const service = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const errorHandler = require("../errors/errorHandler")
const notFound = require("../errors/notFound")

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  
  const date = req.query.date;
  console.log(date)
  
  const result=await service.read(date);
  console.log("result", result)
  
  res.json({data: result})
}

async function reservationDateExists(req, res, next){
  //const reservation = await service.read(req.params.reservationDate)
  const date = req.query.date;
  const reservation = await service.read(date)
  if(reservation){
    res.locals.reservation = reservation;
    return next();
  }
  next({ status:404, message:`Reservation cannot be found.` })
}

async function read(req, res){
  const reservation=res.locals
  console.log("read function")
  res.json({data: reservation})
}

module.exports = {
  list,
  read:[reservationDateExists,read],
};
