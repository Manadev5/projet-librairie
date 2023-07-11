const express = require('express');
const mongoose = require('mongoose');
const BooksRoute = require('./Routers/Books');
const UserRoute = require('./Routers/User')

const app = express();

mongoose.connect('mongodb+srv://manakabamba:Ginocchio21@cluster.ewyzvqp.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  

app.use('/api/books', BooksRoute);
app.use('/api/auth', UserRoute);

module.exports = app