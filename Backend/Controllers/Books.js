const { error } = require('console');
const Book = require('../Models/Book');
const fs = require('fs');
const { json } = require('express');


exports.allBooks = (req, res) => {
    Book.find()
    .then(books => res.status(201).json(books))
    .catch(error => res.status(404).json({error}));
};

exports.createBook = (req, res) =>{
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject.userId;
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        averageRating: 0,
        ratings : [],
        imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    
    book.save()
      .then(() => {res.status(201).json({message :'objet créé'})})
      .catch(error => {res.status(400).json({error})})
   
};

exports.oneBook = (req, res) =>{
    Book.findOne({_id : req.params.id})
       .then(book => res.status(200).json(book))
       .catch(error => res.status(404).json({error}))

}

exports.bestBooks  = (req, res) =>{
    Book.find()
    .then( books => {
        books.sort((a, b) => b.averageRating - a.averageRating);
        const bestRatedBooks = books.slice(0, 3);
        
        res.status(200).json(bestRatedBooks)})
    .catch(error => res.status(404).json({error}))

}

exports.modifyBook  = (req, res) =>{
    /* creation de l'objet bookObjet si il y a une image ajouté (type file) ou non*/
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
    // recherche du livre avec findOne et enregistrement de nouvels données avec updtaeOne 
    delete bookObject._userId;
   Book.findOne({_id : req.params.id})
      .then((book) => {
        //  si l'utilisateur n'est pas verifié il aura seulment acces à la version sans authentification du livre 
        if(book.userId != req.auth.userId){
            res.status(403).json({message : 'unauthorized request'})
            
        }else{

            Book.updateOne({_id : req.params.id}, {...bookObject, _id : req.params.id})
            .then(() => res.status(201).json({message : 'objet modifié'}))
            .catch((error) => res.status(400).json({error}))
        
       }
      })
      .catch(error => res.status(404).json({error}))
    
}

 

exports.addRating  = (req, res) => {
ratingObject = req.body;
   
let Rating = {
         userId:  req.auth.userId,
         grade : ratingObject.rating
   }
 console.log(Rating);
    
Book.findOneAndUpdate({_id: req.params.id},{$push:{ratings:Rating, new: true}})
     .then( book => {
                
                    const sumRatings = book.ratings.reduce((sum, rating) => sum + rating.grade, 0);
                    book.averageRating = sumRatings / book.ratings.length;
                    book.averageRating.toFixed(2);

                    res.status(200).json(book);
                     
                    book.save()
                       .then(book => {res.status(201).json(book)})
                       .catch(error => {res.status(400).json({error})})
               
                    
     })
     .catch(error => res.status(404).json({error}))
     
}

exports.deleteBook  = (req, res) =>{
 Book.findOne({_id : req.params.id})
       .then(book => {
        if(book.userId != req.auth.userId){

            res.status(403).json({error})
           
        }else{
            const fileName = book.imageUrl.split('/images/')[1];
            fs.unlink(`/images/${fileName}`, () => {
                Book.deleteOne({_id : req.params.id})
                .then(() => res.status(200).json({message : 'objet supprimé'}))
                .catch((error) => res.status(400).json({error}))
                
         })
           
        }
       } )
       .catch(error => res.status(404).json({error}))

}
