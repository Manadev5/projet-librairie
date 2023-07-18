const Book = require('../Models/Book');
const fs = require('fs');


exports.allBooks = (req, res, next) => {
    Book.find()
    .then(books => res.status(201).json(books))
    .catch(error => res.status(404).json({error}));
};

exports.createBook = (req, res, next) =>{
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject.userId;
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        averageRating: 0,
        rating : [],
        imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    
    book.save()
      .then(() => {res.status(201).json(console.log('objet créé'))})
      .catch(error => {res.status(404).json({error})})
   
};

exports.oneBook = (req, res ,next) =>{
    Book.findOne({_id : req.params.id})
       .then(book => res.status(200).json(book))
       .catch(error => res.status(404).json({error}))

}

exports.bestBooks  = (req, res ,next) =>{
   /* Book.find(req.body.Rating)
    .then(books => res.status(200).json(books))
    .catch(error => res.status(404).json({error}))*/

}

exports.modifyBook  = (req, res ,next) =>{
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
    
    delete bookObject.userId;
    Book.findOne({_id : req.params.id})
      .then((book) => {
        if(book.userId !== req.auth.userId){
           oneBook()
        }else{
            Book.updateOne({_id : req.params.id}, {...bookObject, _id : req.params.id})
                 .then(() => res.status(201).json({message : 'objet modifié'}))
                 .catch(error => res.status(404).json({error}))
        }
      })
      .catch(error => res.status(401).json({error}))

}

exports.addRating  = (req, res ,next) =>{

}

exports.deleteBook  = (req, res ,next) =>{
    Book.findOne({_id : req.params.id})
       .then(book => {
        if(book.userId === req.auth.userId){

            const fileName = book.imageUrl.split('/images/')[1];
            fs.unlink(`/images/${fileName}`, () => {
                Book.deleteOne({_id : req.params.id})
                .then(() => res.status(200).json({message : 'objet supprimé'}))
                .catch((error) => res.status(400).json({error}))
            })
           
        }else{
            res.status(400).json({error})
        }
       } )
       .catch(error => res.status(404).json({error}))

}
