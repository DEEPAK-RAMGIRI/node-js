
const allowedOrigin = require('./allowedOrigins')
const corsOption = {
    origin : (origin,callback) => {
        if (allowedOrigin.indexOf(origin) !== -1 || !origin){
            callback(null,true);
        }else{
            callback(new Error(`This ${origin} not in the WhiteList`))
        }
    },
    optionsSuccessStatus: 200
}

exports.module = corsOption;