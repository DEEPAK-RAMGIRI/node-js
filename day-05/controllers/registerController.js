const userDb = {
    users : require('../model/users.json'),
    setUsers : function (data) { this.users = data}
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handelNewUser = async (req,res) => {
    const {username ,password} =req.body;
    if(!username || !password) return res.status(400).json({"message": "username or password is Required "})

    const duplicates = userDb.users.find(person => person.username === username);
    if (duplicates) return res.status(409).json({"message": "user exist" }) // send status means user already exist
    try{
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser ={'username': username, "password": hashedPassword};
        userDb.setUsers([...userDb.users, newUser]);

        await fsPromises.writeFile(
            path.join(__dirname,'..','model','users.json'),
            JSON.stringify(userDb.users,null,2)
        );
        console.log(userDb.users);
        res.status(201).json({'success':`newUser ${username} created`})

    }catch(err){
        res.status(500).json({'message':err.message})
    }
}

module.exports =handelNewUser;

