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

//capacity is less than the  number of people in reservation

//if table is occupied return 400 with error message

module.exports = {
    list,
    create,
}