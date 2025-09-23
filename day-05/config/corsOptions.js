const whiteList = ['http://localhost:3000']
const corsOption = {
    origin : (origin,callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin){
            callback(null,true);
        }else{
            callback(new Error(`This ${origin} not in the WhiteList`))
        }
    },
    optionsSuccessStatus: 200
}

exports.module = corsOption;