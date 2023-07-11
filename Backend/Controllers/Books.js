const Book = require('../Models/Book');

exports.allBooks = (res, req, next) => {
    Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(404).json({error}))
}

exports.createBook = (res, req, next) =>{
    const bookObject = JSON.parse(req.body.books)
}