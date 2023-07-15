const express = require('express');
const router = express.Router();
const bookCtrl = require('../Controllers/Books');
const auth = require('../Middlewares/Auth');

router.get('/', bookCtrl.allBooks);

router.get('/:id', bookCtrl.oneBook );

router.get('/bestrating', bookCtrl.bestBooks);

router.post('/', auth, bookCtrl.createBook);

router.put('/:id', auth, bookCtrl.modifyBook);

router.post('/:id/rating', auth, bookCtrl.addRating);

router.delete('/:id', auth, bookCtrl.deleteBook);

module.exports = router