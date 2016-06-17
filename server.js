'use strict'
const express = require('express')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser')
const multer = require('multer')
const upload = multer()

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;
const dbUrl = 'mongodb://localhost:27017/wzkc';

let data = []

let userId = 'user_123'

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

var server = app.listen(8090, () => {
    
    let host = server.address().address
    let port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)
    
}) 