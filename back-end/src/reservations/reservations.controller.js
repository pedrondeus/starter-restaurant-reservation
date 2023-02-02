const service = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const errorHandler = require("../errors/errorHandler")
const notFound = require("../errors/notFound")

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  
  const phone = req.query.mobile_number;
  const date = req.query.date;
  if(phone){
    const result=await service.search(phone)
    res.json({data:result})
  } else if(date) {
      const result=await service.read(date);
      console.log("result", result)
      res.json({data: result})
    } else {
      const result=await service.list();
      res.json({data: result})
    }
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
  const {reservation_date, reservation_time} = req.body.data;
  const reserveDate = new Date(reservation_date);
  const today = new Date()

  console.log("date test", reserveDate.getDay())

  if(reserveDate.getDay() === 1){
    return next({status:400, message:`The restaurant is closed on Tuesdays`})
  } 

  if(reserveDate < today){
    return next({status:400, message: `The reservation time and date must be in the future`})
  }

  if(reservation_time < '10:30'){
    return next({status:400, message: `The reservation time must be between 10:30AM and 9:30PM`})
    }

  if(reservation_time > '21:30'){
    return next({status:400, message: `The reservation time must be between 10:30AM and 9:30PM`})
  }

  next()
}

async function update(req, res) {
  const reservation_id = Number(req.params.reservation_id);
  const data = await service.update(reservation_id);
  res.json({ data });
}

module.exports = {
  list,
  update,
  read:[reservationDateExists, asyncErrorBoundary(read), read],
  create:[validDate, asyncErrorBoundary(create)],
};
