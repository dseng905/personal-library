const express = require('express');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const app = express();
const method = require("./methods");

app.set('case sensitive routing', true);
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(helmet.noCache());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0'}));
app.use('/public', express.static(process.cwd() + '/public'));
app.get('/', (req,res) => res.sendFile(process.cwd() + '/views/index.html'));

const mongoURI = 'mongodb+srv://dseng905:ubho0d3I6lxe2SAa@cluster0-jnimq.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.route('/api/books')
  .get(method.getAllBooks) //Retrieve all books
  .post(method.addBook) //Add a book
  .delete(method.deleteAllBooks) //delete ALL books

app.route('/api/books/:id')
  .get(method.getOneBook) //Get one book with comments
  .post(method.addCommentToBook) //Add comment to a book
  .delete(method.deleteOneBook) //Delete a book

app.use(function (req, res, next) {
  res.status(404).send('404 - Not Found!');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started on port');
});