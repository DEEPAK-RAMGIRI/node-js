const express = require('express')
const router = express.Router()
const {allEmployeeDetails,createNewEmployee,updateEMployee,deleteEMployee,getEmployee} = require('../../controllers/employeeController')

router.route('/')
    .get(allEmployeeDetails)
    .post(createNewEmployee)
    .put(updateEMployee)
    .delete(deleteEMployee)
router.route('/:id').get(getEmployee)
module.exports = router; 