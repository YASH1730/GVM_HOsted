const mongoose = require('mongoose');

const department = mongoose.Schema({
    name : {type : String, unique : true}
})

module.exports = mongoose.model('department',department);