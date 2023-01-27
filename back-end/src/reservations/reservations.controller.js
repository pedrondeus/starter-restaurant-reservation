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

async function create(req, res, next){
  const newReservation = ({
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
    created_at,
    updated_at,
  } = req.body.data);
  console.log("request", req)
  const createdReservation = await service.create(req.body.data);
  res.status(201).json({ data: createdReservation })
}

//function to validate phone number

//function to check if date is not tuesday, then proceed

//The reservation date and time combination is in the past. Only future reservations are allowed. E.g., if it is noon, only allow reservations starting after noon today.

function validDate(req, res, next){
  const {reservation_date, reservation_time} = res.locals.reservation;
  const reserveDate = new Date(reservation_date + "T" + reservation_time);
  const today = new Date()

  
  if(reserveDate.getDay() === 2){
    return next({status:400, message:`The restaurant is closed on Tuesdays`})
  } 

  if(reserveDate < today){
    return next({status:400, message: `The reservation time and date must be in the future`})
  }

  if(reserveDate < '10:30AM' || reserveDate > '9:30PM'){
    return next({status:400, message: `The reservation time must be between 10:30AM and 9:30PM`})
  }
}

module.exports = {
  list,
  read:[reservationDateExists, asyncErrorBoundary(read), read],
  create:[validDate, asyncErrorBoundary(create)],
};
