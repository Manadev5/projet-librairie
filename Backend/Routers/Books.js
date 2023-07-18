const express = require('express');
const router = express.Router();
const bookCtrl = require('../Controllers/Books');
const auth = require('../Middlewares/Auth');
const multer = require('../Middlewares/Multer')

router.get('/', bookCtrl.allBooks);

router.get('/:id', bookCtrl.oneBook );
/* Route pour obtenir le trois meillaurs livres selon le averageRating*/
router.get('/bestrating', bookCtrl.bestBooks);

router.post('/', auth, multer, bookCtrl.createBook);

router.put('/:id', auth, multer, bookCtrl.modifyBook);
/* Route pour noter un livre */
router.post('/:id/rating', auth, bookCtrl.addRating);

router.delete('/:id', auth, bookCtrl.deleteBook);

module.exports = router