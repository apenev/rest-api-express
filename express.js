var express = require('express'),
  bodyParser = require('body-parser')
  logger = require('morgan')

var elasticSearch = require('elasticsearch');
var ENV = require('../config.json')[GLOBAL.ENV || "dev"];
var client = new elasticSearch.Client({
    host: 'http://localhost:9201'
});

var searchForCollection=function (id) {
var deferred = q.defer();
        client.get({
            index: 'freeyup',
            type: 'vote',
            id: voting.voteId
        }, function (getErr, getResp) {
            if (getErr) {
                votesLog.error("Error in get right Vote " , getErr);
                deferred.reject(getErr);
                return deferred.promise;
            } else {
            }


}

var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(logger('dev'))

//var db = mongoskin.db('mongodb://@localhost:27017/test', {safe:true})

app.param('collectionName', function(req, res, next, collectionName){
  //req.collection = db.collection(collectionName)
  return next()
})

app.get('/', function(req, res, next) {
  res.send('please select a collection, e.g., /collections/messages')
})

/*
  app.get('/collections/:collectionName', function(req, res, next) {
  req.collection.find({} ,{limit: 10, sort: {'_id': -1}}).toArray(function(e, results){
    if (e) return next(e)
    res.send(results)
  })
})
*/

/* app.post('/collections/:collectionName', function(req, res, next) {
  req.collection.insert(req.body, {}, function(e, results){
    if (e) return next(e)
    res.send(results)
  })
})

app.get('/collections/:collectionName/:id', function(req, res, next) {
  req.collection.findById(req.params.id, function(e, result){
    if (e) return next(e)
    res.send(result)
  })
})

app.put('/collections/:collectionName/:id', function(req, res, next) {
  req.collection.updateById(req.params.id, {$set: req.body}, {safe: true, multi: false}, function(e, result){
    if (e) return next(e)
    res.send((result === 1) ? {msg:'success'} : {msg: 'error'})
  })
})

app.delete('/collections/:collectionName/:id', function(req, res, next) {
  req.collection.removeById(req.params.id, function(e, result){
    if (e) return next(e)
    res.send((result === 1)?{msg: 'success'} : {msg: 'error'})
  })
})
*/


//GLOBAL.ENV = process.argv[2]||'local';
console.log("Starting server on port 8001 ");
var debug = require('debug')('debug');


// Start forking if you are the master.
cluster = require('cluster')
numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    for (var i = 0; i < numCPUs; i++) { cluster.fork() }
} else { app.listen(8001); }

