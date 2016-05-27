'use strict' 
var express = require('express')
var app = express()
var fs = require('fs')

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/listItem', (req, res) => {    
    let id = 123
    fs.readFile(__dirname + "/data/" + id + ".json", 'utf-8', (err, data) => {
        console.log(data)
        res.send(data)
    })        
}) 

app.get('/', (req, res) => {    
    
        res.send('Hello!')            
}) 

var server = app.listen(8081, () => {
    let host = server.address().address
    let port = server.address().port
    
    console.log("应用实例，访问地址为 http://%s:%s",host,port)
}) 