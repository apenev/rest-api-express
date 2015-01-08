var express = require('express'),
    bodyParser = require('body-parser');
var logger = require('morgan');
var q = require('q');
var Promise = require('promise');

var elasticSearch = require('elasticsearch');
var config = require('./config.json');

var client = new elasticSearch.Client(config.elasticsearch);

var searchForCollection = function (id) {

    return new Promise(function (fulfill, reject) {
        client.get({
            index: 'collections',
            type: 'collection',
            id: id
        }, function (error, response) {
            if (error) {
                console.error("Error in get right Vote ", error);
                reject(error);
            } else {
                fulfill(response);
            }
        });
    });
};

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));

app.get('/', function(req, res, next) {
   res.send('test');
});

app.get('/:id', function (req, res, next) {
    var id = req.param('id', 0);
    console.log(id);
    searchForCollection(id).then(function (result) {
        console.log(result);
        res.send(result._source);
    }, function(error) {
        res.send(error);
    });
});

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
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
} else {
    app.listen(8001);
}

