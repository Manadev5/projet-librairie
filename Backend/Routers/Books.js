const express = require('express');
const router = express.Router();
const bookCtrl = require('../Controllers/Books')

router.get('/', bookCtrl.allBooks);

router.get('/:id', bookCtrl.oneBook );

router.get('/bestrating', bookCtrl.bestBooks);

router.post('/', bookCtrl.createBook);

router.put('/:id', bookCtrl.modifyBook);

router.post('/:id/rating', bookCtrl.addRating);

router.delete('/:id', bookCtrl.deleteBook);

module.exports = router