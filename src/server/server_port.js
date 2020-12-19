const express = require('express');
const cors = require('cors');
const bodyParser = require ('body-parser');

//
const app = express()
//
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//
app.use(express.static('dist'));
//

// test endpion 
app.get('/testApi',function(req,res){
    res.status(200).json({ done: "done" });
});

module.exports =app;