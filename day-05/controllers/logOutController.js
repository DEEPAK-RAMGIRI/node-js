const userDb = {
    users : require('../model/users.json'),
    setUsers : function (data) { this.users = data}
}
const fsPromises = require('fs').promises;
const path = require('path')

const handelLogout = async (req,res) => {
    const cookies = req.cookies;

    if(!cookies?.jwt) return res.sendStatus(204);

    const refreshToken = cookies.jwt;

    const foundUser = userDb.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser){
        res.clearCookie('jwt',{httpOnly:true});
        return res.sendStatus(204);
    }
        const otherUsers =userDb.users.filter(person => person.refreshToken !== foundUser.refreshToken);
        const curreUser = {...foundUser,refreshToken:''};
        userDb.setUsers([...otherUsers,curreUser]);
        await fsPromises.writeFile(path.join(__dirname,'..','model','users.json')
        ,JSON.stringify(userDb.users,null,2) );

        res.clearCookie('jwt',{httpOnly:true,sameSite:'None',secure:true});
        res.sendStatus(204)
}

module.exports = handelLogout; 