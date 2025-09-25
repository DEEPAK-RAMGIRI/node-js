const userDb = {
    users : require('../model/users.json'),
    setUsers : function (data) { this.users = data}
}

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
require('dotenv').config();

const fsPromises = require('fs').promises;
const path = require('path');
const { ref } = require('process');

const handelLogin = async (req,res) => {
    const {username ,password} =req.body;
        if(!username || !password) return res.status(400).json({"message": "username or password is Required "})

    const foundUser = userDb.users.find(person => person.username === username);
    if (!foundUser){
        return res.status(401).json({"message":"unauthorized"});
    }
    const match =await bcrypt.compare(password,foundUser.password);
    if (match){
        const accessToken  =jwt.sign(
            {"username":foundUser.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'30s'} 
        );
        const refreshToken  =jwt.sign(
            {"username":foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'1d'} 
        );

        const otherUsers = userDb.users.filter(person => person.username !== foundUser.username);
        const currentUser = {...foundUser,refreshToken};
        userDb.setUsers([...otherUsers,currentUser]);
        await fsPromises.writeFile(
            path.join(__dirname,'..','model','users.json'),
            JSON.stringify(userDb.users,null,2)
    );
        res.cookie('jwt',refreshToken,{httpOnly:true,sameSite:'None',secure :'true',maxAge: 24 *60 * 60 * 1000})
        res.json({accessToken})
    }else{
        res.sendStatus(401);
    }
}

module.exports = handelLogin; 