const express = require('express');
const router = express.Router();
const bookCtrl = require('../Controllers/Books');
const auth = require('../Middlewares/Auth');
const multer = require('../Middlewares/Multer')

router.get('/', bookCtrl.allBooks);

router.get('/:id', bookCtrl.oneBook );

router.get('/bestrating', bookCtrl.bestBooks);

router.post('/', auth, multer, bookCtrl.createBook);

router.put('/:id', auth, multer, bookCtrl.modifyBook);

router.post('/:id/rating', auth, bookCtrl.addRating);

router.delete('/:id', auth, bookCtrl.deleteBook);

module.exports = router