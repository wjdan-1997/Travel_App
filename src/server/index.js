// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require ('body-parser');
var path = require('path');
const fetch = require('node-fetch');
// Start up an instance of app
const app = express()
/* Dependencies */

// Cors for cross origin allowance
app.use(cors()); // the connection between the client and server
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Initialize the main project folder
app.use(express.static('dist'));
//
console.log(__dirname)
// Setup server

// Start Endpoint  (GET Router)
app.get('/' ,function(req,res){
   res.sendFile('dist/index.html')
   
})
// test endpion 
app.get('/testApi',function(req,res){
    res.status(200).json({message:"Success",
    Name:"wejdan-altleb in Port 8070"
    }) 
})

app.listen(8070,()=>{
    console.log("Travel App listen on port 8070, Enjoy!");
})


// Setup empty JS object to act as endpoint for all routes
const projectData={}
// Methode POST : Add New Data 
app.post('/api', async (req, res)=>{
    data = [
        projectData['CityName'] = req.body.city,
        projectData['booking']=req.body.booking,
        projectData['dateTime'] = req.body.dateTime,
        projectData['country_code'] = req.body.country_code,
        projectData['zone'] = req.body.timezone,
        projectData['weather']= req.body.weather,
        projectData['temp']=req.body.temp,
    ]
    projectData[data]; // push data in projectData {} fetch data from body 
    res.send(projectData);
})

module.exports = app;