const express = require('express');
const path = require('path');
const cors = require('cors');

const {corsOption} = require('./config/corsOptions');
const {logger} =  require('./middleware/logEvents');
const errorHandle = require('./middleware/errorHandler');

const PORT = 3000;
const app = express();

app.use(cors(corsOption));

app.use(logger);

app.use(express.urlencoded({extended : false}))
app.use('/',express.static(path.join(__dirname,'/public')))
app.use(express.json())

app.use('/',require('./Routes/root'))
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

