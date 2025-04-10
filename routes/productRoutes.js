const express = require('express');
const router = express.Router();


const productController = require('../controllers/productController')

router.get('/',  productController.getAllProducts);
router.get('/:id',  productController.getOneProduct);

// Ruta para crear un nuevo producto
router.post('/create-product', productController.createProduct);
//Modifier un produit
router.put('/:id/update', productController.modifyProduct)
// delete
router.delete ('/:id/delete', productController.deleteProduct)

// Ruta para añadir varios productos a la vez
router.post('/create-multiple-products', productController.createMultipleProducts);
// Ruta para obtener productos por categoría
router.get('/category/:category', productController.getProductsByCategory);


module.exports = router;