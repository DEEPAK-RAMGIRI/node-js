const userDb = {
    users : require('../model/users.json'),
    setUsers : function (data) { this.users = data}
}


const bcrypt = require('bcrypt');

const handelLogin = async (req,res) => {
    const {username ,password} =req.body;
        if(!username || !password) return res.status(400).json({"message": "username or password is Required "})

    const foundUser = userDb.users.find(person => person.username === username);
    if (!foundUser){
        return res.status(401).json({"message":"unauthorized"});
    }
    const match =await bcrypt.compare(password,foundUser.password);
    if (match){
        res.json({'success':`user ${username} is logged in`})
    }else{
        res.send(401);
    }
}

module.exports = handelLogin; 