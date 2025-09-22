const {logEvents}= require('./logEvents');

const errorHandle = (err,req,res,next) => {
        logEvents(`${err.name} : ${err.message}`,'errorslogs.txt');
        res.status(500).send(err.message)
    }
module.exports = errorHandle;