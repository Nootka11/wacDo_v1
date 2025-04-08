const express = require('express');
const router = express.Router();


const productController = require('../controllers/productController')

router.get('/',  productController.getAllProducts);
router.get('/:id',  productController.getOneProduct);

// Ruta para crear un nuevo producto
router.post('/create-product', productController.createProduct);


module.exports = router;