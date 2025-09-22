const path = require('path');
const express = require('express');
const app = express()
const {logger} =  require('./middleware/logEvents')

const PORT = 3000;

app.use(logger);

app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(express.static(path.join(__dirname,'/public')))
app.get(/^\/$|\/index(.html)?$/, (req,res) => {res.sendFile(path.join(__dirname,'views','index.html'))});

app.get(/new-page(.html)?/,(req,res) => {res.sendFile(path.join(__dirname,'views','new-page.html'))});

app.get(/old-page(.html)?/,(req,res) => {res.redirect(301,'/new-page.html')});

app.get(/hello(.html)?/,(req,res,next) => {
    console.log("user loaded the page");  
    next();
},
(req,res) => {res.send('Hello User')}
);
app.get(/.*/,(req,res) => {res.status(404).sendFile(path.join(__dirname,'views','404.html'))})


app.listen(PORT,(req,res) => console.log(`ya ya i'am listening ${PORT}`))

