// this file holds all the employee related controllers 
const emp = require('../../database/model/employee')
const dept = require('../../database/model/department')


exports.sayHello = async (req, res) => {
    res.send('ALl Good LEt Go !!!')
}

exports.addEmployee = async (req, res) => {
    console.log('>>', req.body);

    try {
        const data = emp(req.body);

        if (req.body.newDept) {
            const newDept = dept({ name: req.body.department })
            newDept.save().then().catch(() => { })
        }
        data.save()
            .then((response) => {
                return res.send({ response, message: 'Employee Saved Successfully !!!' });
            })
            .catch((err) => {
                return res.send({ message: 'Duplicate email are not allowed!!!' });
            })

    } catch (error) {
        console.log(error)
        return res.sendStatus(500).send({ message: 'Something Went Wrong !!!' })
    }

}

exports.updateEmployee = async (req, res) => {
    console.log('>>', req.body);

    try {

        emp.updateOne({_id : req.body._id},req.body)
            .then((response) => {
                return res.send({ response, message: 'Employee Updated Successfully !!!' });
            })
            .catch((err) => {
                return res.send({ message: 'Something Went Wrong (Duplicate Value are not allowed) !!!' });
            })

    } catch (error) {
        console.log(error)
        return res.sendStatus(500).send({ message: 'Something Went Wrong !!!' })
    }

}

exports.listEmployee = async (req, res) => {
    try {
        // console.log(req.query)
        const params = {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 50,
        }
        const total = await emp.estimatedDocumentCount()

        // console.log(total);
        await emp.find()
            .skip(params.page > 0 ? (params.page - 1) * params.limit : 0)
            .limit(params.limit)
            .then((response) => {
                // console.log(response)
                if (response) {
                    return res.send({ data: response, total: total })
                }
            })

    } catch (error) {
        console.log(error)
        return res.sendStatus(500).send({ message: 'Something Went Wrong !!!' })
    }
}


exports.deleteEmployee = async (req, res) => {
    emp.deleteOne({ email: req.query.email})
        .then((data) => {
            console.log(data)
            if(data.deletedCount > 1) return res.send({ message: "Employee deleted successfully !!!" })
            else return res.sendStatus(403).send({ message: "Employee not found !!!" })
        })
        .catch((err) => {
            res.send({ message: 'Some error occurred !!!' })
        })
}