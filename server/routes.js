const express  = require('express')
const route  = express.Router()
const cors = require('cors')
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer()

route.use(bodyParser.json())
route.use(bodyParser.urlencoded({extended : true}))
route.use(upload.array())

// acquiring controller 
const emp = require('./controller/employee');
const dept = require('./controller/department');

route.use(cors());

route.get('/',emp.sayHello);

route.post('/addEmployee',emp.addEmployee);

route.get('/listEmployee',emp.listEmployee);

route.patch('/updateEmployee',emp.updateEmployee);

route.delete('/deleteEmployee',emp.deleteEmployee);

// department route 
route.get('/listDepartment',dept.listDepartment);

module.exports =  route;