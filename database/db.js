require('dotenv').config();
const colors = require('colors');
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URI , { useNewUrlParser : true, useUnifiedTopology : true})
.then((res)=>console.log('> Connected...'.bgCyan))
.catch(err=>console.log(`> Error while connecting to mongoDB : ${err.message}`.underline.red ))