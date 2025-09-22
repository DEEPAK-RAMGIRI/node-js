const path = require('path');
const express = require('express');
const cors = require('cors')
const {logger} =  require('./middleware/logEvents');
const { callbackify } = require('util');
const errorHandle = require('./middleware/errorHandler')
const PORT = 3000;

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

const app = express();

app.use(cors(corsOption));
app.use(logger);

app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.use('/',express.static(path.join(__dirname,'/public')))
app.use('/subdir',express.static(path.join(__dirname,'/public')))

app.use('/',require('./Routes/root'))
app.use('/subdir',require('./Routes/subdir'))
app.use('/employees',require('./Routes/api/employee'))

app.use(errorHandle);

app.all(/.*/,(req,res) => {
    res.status(404)
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname,'views','404.html'))
    }else if(req.accepts('json')) {
        res.json({error : '404 Page Not Found'})
    }else{
        res.type('txt').send('404 page not Found')
    }
    
    
})


app.listen(PORT,(req,res) => console.log(`ya ya i'am listening ${PORT}`))

