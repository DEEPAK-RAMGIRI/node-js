const data = {
        employees : require('../model/data.json'),
        setEmployees : function (data) {this.employees = data}
}
const allEmployeeDetails = (req,res) => {
        res.json(data.employees);
}

const createNewEmployee = (req,res) => {

        const newEmployee = {
                id : data.employees[data.employees.length - 1].id + 1 || 1,
                firstname : req.body.firstname,
                lastname : req.body.lastname
        }
        if (!newEmployee.firstname || !newEmployee.lastname){
                return res.status(400).json({"message":"First and lastName are required"});
        }
        data.setEmployees([...data.employees,newEmployee]);
        res.status(201).json(data.employees);
}

const updateEMployee = (req,res) => {
       
        const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
        if(!employee){
                return res.status(400).json({"message":"employee not found in the database"})
        }
        if(req.body.firstname) employee.firstname = req.body.firstname
        if(req.body.lastname) employee.lastname = req.body.lastname

        const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
        const final =[...filteredArray,employee]
        data.setEmployees(final.sort((a,b) =>a.id > b.id ? 1: a.id < b.id ? -1 : 0))
        res.status(201).json(data.employees);
}

const deleteEMployee = (req,res) => {
        const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
        if(!employee){
                return res.status(400).json({"message":"employee not found in the database"})
        }
        const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
        data.setEmployees([...filteredArray])
        res.status(200).json(data.employees);
}

const getEmployee = (req,res) => {
         const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
        if(!employee){
                return res.status(400).json({"message":"employee not found in the database"})
        }
        res.json(employee)
}

module.exports = {allEmployeeDetails,createNewEmployee, updateEMployee, deleteEMployee, getEmployee}; 
