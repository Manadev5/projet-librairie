const Book = require('../Models/Book');

exports.allBooks = (res, req, next) => {
    Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(404).json({error}))
};

exports.createBook = (res, req, next) =>{
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject.userId;
    const book = new Book({
        ...bookObject,
        userId : req.auth.userId,
        rating :[{
            userId: req.auth.userId,
            grade : bookObject,
        }],
        imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    
    book.save()
      .then(() => {res.status(200).json('Objet enregistré')})
      .catch(error => {res.status(404).json({error})})
   
};

exports.oneBook = (res, req ,next) =>{

}

exports.bestBooks  = (res, req ,next) =>{

}

exports.modifyBook  = (res, req ,next) =>{

}

exports.addRating  = (res, req ,next) =>{

}

exports.deleteBook  = (res, req ,next) =>{

}
