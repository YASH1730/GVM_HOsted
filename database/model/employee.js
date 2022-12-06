const { timeStamp } = require('console');
const mongoose = require('mongoose');

const employee = mongoose.Schema({
    firstName : {type : String},
    lastName : {type : String},
    email : {type : String, unique : true},
    department : {type : String},
})

module.exports = mongoose.model('employee',employee);