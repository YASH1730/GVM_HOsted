const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const path = require('path')
const DB = require('./database/db');

app.use('/api',require('./server/routes'));

// connect backend to frontend

app.use(express.static("employee/build"));
  
app.get("*",(req,res)=>{
  res.sendFile(path.resolve(__dirname,'employee','build','index.html'))
})

app.listen(port,(req,res)=>{
    console.log('Server is Running on port 8000');
})