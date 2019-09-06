const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json({}));

// Connect to MongoDB
mongoose
  .connect(
    'mongodb://mongo:27017/docker-node-mongo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const Item = require('./models/Item');

app.get('/', (req, res) => {
  Item.find()
    .then(items => res.render('index', { items }))
    .catch(err => res.status(404).json({ msg: 'No items found' }));
});

app.post('/item/add', (req, res) => {
  console.log(req.body);

  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.redirect('/'));
});

app.patch('/ssn', (req, res) => {
  const ssn = new Item({
    name: req.body.ssn
  });
  
  ssn.save().then(item => res.status(200).send({
      message: "SSN Patched"
    })).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
      })});
});

const port = 3000;

app.listen(port, () => console.log('Server running...'));
