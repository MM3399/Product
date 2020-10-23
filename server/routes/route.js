//Importing 3rd party modules
const express = require('express');

//Importing local modules
const productController = require('../controllers/productController');

router = express.Router();

router.get('/' , productController.sendProducts);

router.post('/',productController.getProduct);

router.get('/:id', productController.sendAProduct);

module.exports = router