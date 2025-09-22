const express = require('express')
const { route } = require('../subdir')
const router = express.Router()

const data = {}
data.employees = require('../../data/data.json')
router.route('/')
    .get((req,res) => {
        res.json(data.employees);
    })
    .post((req,res) => {
        console.log("BODY:", req.body); 
        res.json({
            "firstname":req.body.firstname,
            "lastname": req.body.lastname
        })
    })
    .put((req,res) => {
        res.json({
             "firstname":req.body.firstname,
            "lastname": req.body.lastname
        })
    })
    .delete((req,res) => {
        res.json({"id":req.body.id})
    })
router.route('/:id').get((req,res) => {res.json({"id": req.params.id})})
module.exports = router;