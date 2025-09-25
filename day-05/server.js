const express = require('express');
const path = require('path');
const cors = require('cors');

const {corsOption} = require('./config/corsOptions');
const {logger} =  require('./middleware/logEvents');
const errorHandle = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const crediantles = require('./middleware/Credentials')

const PORT = 3000;
const app = express();
app.use(logger);
app.use(crediantles);
app.use(cors(corsOption));


app.use(express.urlencoded({extended : false}))
app.use('/',express.static(path.join(__dirname,'/public')))

app.use(express.json());
app.use(cookieParser());
app.use('/',require('./Routes/root'))
app.use('/register',require('./Routes/register'))
app.use('/auth',require('./Routes/auth'))
app.use('/refresh',require('./Routes/refresh'))
app.use('/logout',require('./Routes/logout'))
app.use(verifyJWT);
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

