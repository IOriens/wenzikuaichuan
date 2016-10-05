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


let data = []

let userId = 'user_123'


var isProduction = function () {
    return process.env.NODE_ENV === 'production';
};


// Mongodb Services
const dbUrl = 'mongodb://localhost:27017/wzkc';

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

var deleteDocument = function (db, collection, data, callback) {
    db.collection(collection).deleteOne(data, function (err, result) {

        assert.equal(err, null);
        console.log(`Deleted a document in the ${collection} collection.`);
        callback();

    });
}


// Routing 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.all('/*', function (req, res, next) {

    // Cors
    res.header("Access-Control-Allow-Origin", "http://wzkc.ioriens.com/ , http://localhost/");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "OPTIONS,GET,POST,PUT,DELETE")
    next();

});

// 获取信息
app.get('/api/Items', (req, res) => {

    MongoClient.connect(dbUrl, function (err, db) {

        assert.equal(null, err);

        console.log("Connected correctly to server.");

        findDocument(db, userId, {}, () => {
            res.send(data)
            db.close()
        })

    });

})

// 增加条目
app.post('/api/Items', upload.array(), (req, res, next) => {

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

// 删除条目
app.delete('/api/Items', upload.array(), (req, res, next) => {

    let item = req.body.id        

    let deleteItem = {"time":item}
    console.log(deleteItem)


    MongoClient.connect(dbUrl, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server.");
        deleteDocument(db, userId, deleteItem, () => {
            res.send('200 (OK)')
            db.close();
        })
    });    
})


app.get('/api', (req, res) => {

    res.send('Api Here!')

})

var server = app.listen(8091, () => {

    let host = server.address().address
    let port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

}) 