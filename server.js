var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

var Storage = {
  items: [],
  id: 0,
};

Storage.add = function(name) {
  var item = {name: name, id: this.id};
  this.items.push(item);
  this.id += 1;
  return item;
};

var storage = Object.create(Storage);
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

app.get('/items', function(req, res) {
  res.status(200).json(storage.items);
});



app.listen(8080, function() {
  console.log('Your app is now running on port 8080');
});

exports.app = app;
exports.storage = storage;
