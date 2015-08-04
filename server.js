'use strict';

var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/build'));
app.use(express.static(__dirname + '/app/'));

//GET
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('./data/notes', function(req, res) {
    fs.readdir('./data/notes', function(err, data) {
      if (err) {
        console.log(err);
        res.send('GET: ' + err + '.');
      } else {
        res.send(data);
      }
    });
  });

app.get('/:id', function(req, res) {
  fs.readFile('./data/notes/' + req.params.id + '.json', function(err, data) {
    if (err) {
      console.log(err);
      return res.send('error at fs.readFile');
    }
    res.json({"msg":data.toString()});
  });
});

//POST
app.post('/', function (req, res) {
  var id = Date.now();
  var path = './data/notes/' + id + '.json';
  var data = req.body;
  fs.writeFile(path, data, function(err) {
    if (err) {
      console.log('POST: ' + err + '.');
      return res.send('Error!');
    }
    res.json({"msg":"POST successful!", "id": id});
  });
});

//PUT
app.put('/:id', function(req, res) {
  var path = './data/notes/' + req.params.id + '.json';
  fs.readFile(path, function(err, data) {
    if (err) {
      console.log(err);
      res.send('PUT: ' + err + '.');
    }
    fs.writeFile(path, JSON.stringify(req.body), function(err) {
      if (err) {
        console.log('PUT error! ' + err);
        return res.send('Error!');
      }
      res.json({"msg":"PUT successful!"});
    });
  });
});

//DELETE
app.delete('/:id', function(req, res) {
  var path = './data/notes/' + req.params.id + '.json';
  fs.unlink(path, function(err) {
    if (err) {
      console.log(err);
      res.send('DELETE: ' + err + '.');
    }
    res.json({"msg":"file deleted!"});
  });
});

var port = process.env.PORT || 8888;
app.listen(port, function() {
  console.log('======Server started on port ' + port + '!======');
});
