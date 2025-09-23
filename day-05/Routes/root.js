const express = require('express');
const router = express.Router();
const path = require('path')

router.get(/^\/$|\/index(.html)?$/, (req,res) => {
    res.sendFile(path.join(__dirname,'..','views','index.html'))
});

router.get(/hello(.html)?/,(req,res,next) => {
    console.log("user loaded the page");  
    next();
},(req,res) => {
    res.send('Hello User')
}
);


module.exports = router;