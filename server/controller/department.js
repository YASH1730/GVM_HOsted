const dept = require('../../database/model/department')

exports.listDepartment = async (req, res) => {
    try {
        const response = await dept.find()
        if (response) return res.send(response)

    } catch (error) {
        console.log(error)
        return res.sendStatus(500).send({ message: 'Something Went Wrong !!!' })
    }
}
