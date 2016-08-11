const express = require('express');

function Storage() {
  this.items = [];
  this.id = 0;
}

Storage.prototype.add = (name) => {
  const item = { name, id: this.id };
  this.items.push(item);
  this.id += 1;
  return item;
};

let storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

let app = express();
app.use(express.static('public'));

app.get('/items', (request, response) => {
  response.json(storage.items);
});

app.listen(process.env.PORT, process.env.IP);
