const mongoose = require('mongoose');
const Books = require('./models/book');


exports.addBook = (req,res) => {
  Books.create({title : req.body.title}, (err, book) => {
    if(err) return;
    res.json({title : book.title, _id : book._id});
    //res.redirect('/')
  })
}


exports.getAllBooks = (req,res) => {
  Books.find({}, (err,books) => {
    if(err) return;
    const output = books.map(book => ({
      title : book.title,
      _id : book.id,
      commentcount : book.comments.length,
    }))
    return res.send(output);
  });
}

exports.getOneBook = (req,res) => {
  Books.findById(req.params.id, (err,book) => {
    if(err) return res.send("Book could not be found.");
    res.json({
      title: book.title,
      _id : book._id,
      comments : book.comments
    });
  });
}

exports.addCommentToBook = (req,res) => {
  Books.findByIdAndUpdate(req.params.id, {$push : {comments : req.body.comment}}, (err,book) => {
    if(err) return res.send("Book could not be found")
    res.json({
      title: book.title,
      _id : book._id,
      comments : [...book.comments, req.body.comment]
    });
  })
}

exports.deleteOneBook = (req,res) => {
  Books.deleteOne({_id : req.params.id}, (err) => {
    if(err) return res.send("Book could not be found.");
    res.send("delete successful");
  })
}

exports.deleteAllBooks = (req,res) => {
  Books.deleteMany({}, (err) => {
    if(err) return res.send("There are no books to delete.");
    res.send("complete delete successful");
  })
}