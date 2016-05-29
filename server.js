'use strict'
var express = require('express')
var app = express()
var fs = require('fs')
var bodyParser = require('body-parser')
var multer = require('multer')
var upload = multer()


var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var dbUrl = 'mongodb://localhost:27017/wzkc';

var data = []

let userId = '123'

// insertDocument in to mongodb
var insertDocument = function (db, collection, data, callback) {
    
    db.collection(collection).insertOne(data, function (err, result) {
        
        assert.equal(err, null);
        console.log(`Inserted a document into the ${collection} collection.`);
        callback();
        
    });
    
};

// find document in mongodb
var findDocument = function (db, collection, query, callback) {
    
    var cursor = db.collection(collection).find(query);
    console.log(`Searching the ${collection} collection.`);
    data = []
    cursor.each(function (err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            data.push({ "time": doc.time, "message": doc.message })
        } else {            
            callback();
        }
    });
    
};


// Routing 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.all('/*', function (req, res, next) {
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
    
});

app.get('/Items', (req, res) => {

    MongoClient.connect(dbUrl, function (err, db) {
        
        assert.equal(null, err);
        
        console.log("Connected correctly to server.");
        
        findDocument(db, userId, {}, () => {
            res.send(data)
            db.close()
        })
        
    });

})

app.post('/Items', upload.array(), (req, res, next) => {
    
    let item = req.body.item
    let timeTag = new Date().getTime()    
    let uploadItem = ({ "time": timeTag.toString(), "message": item })


    MongoClient.connect(dbUrl, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server.");
        insertDocument(db, userId, uploadItem, () => {
            res.send(uploadItem)
            db.close();
        })
    });
    
})

app.get('/', (req, res) => {
    
    res.send('Hello!')
    
})

var server = app.listen(8081, () => {
    
    let host = server.address().address
    let port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)
    
}) 