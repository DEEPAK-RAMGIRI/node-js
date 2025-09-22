const {format} = require('date-fns')
const {v4:uuid} = require('uuid')
const fs = require('fs')
const fsPrmoises = require('fs').promises;
const path = require('path')

const logEvents = async(message) => {
    const dateTime = `${format(new Date(),'yyyymmdd\thh:mm:ss')}`
    const logTime = `${dateTime}\t${uuid()}\t${message}\n`
    console.log(logTime)
    //
    
    try{
        if(!fs.existsSync(path.join(__dirname,'logs'))){
            await fsPrmoises.mkdir(path.join(__dirname,'logs'));
        }
        await fsPrmoises.appendFile(path.join(__dirname,'logs','eventLogs.txt'),logTime)
    }catch(e){
        console.log(e)
    }
} 
console.log(format(new Date(),'yyyymmdd\thh:mm:ss'));
console.log(uuid())

module.exports = logEvents;