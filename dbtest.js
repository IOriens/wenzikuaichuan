var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/wzkc';

let data = {
    "time":"1464517971581","message":"大放送"
} 

let collection = 'items'

var insertDocument = function(db, collection, data, callback) {
   db.collection(collection).insertOne( data, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the restaurants collection.");
    callback();
  });
};

var findDocument = function(db, collection, query, callback) {
   var cursor =db.collection(collection).find(query);
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         console.log(doc.time);
      } else {
         callback();
      }
   });
};

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  insertDocument(db, collection, data, () => {
    db.close();    
  })  
});

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  findDocument(db, collection,{}, () => {
      db.close()
  })
});