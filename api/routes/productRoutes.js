const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const roleAuthorization = require('../middleware/roleMiddleware')


const productController = require('../controllers/productController')

// Ruta para crear un nuevo producto
router.post('/',auth, roleAuthorization(['admin']), productController.createProduct);
// Ruta para añadir varios productos a la vez
router.post('/create-multiple-products', auth, roleAuthorization(['admin']), productController.createMultipleProducts);

router.get('/',  productController.getAllProducts);
router.get('/:id',  productController.getOneProduct);
// Ruta para obtener productos por categoría
router.get('/category/:category', productController.getProductsByCategory);


//Modifier un produit
router.put('/:id', auth, roleAuthorization(['admin']), productController.modifyProduct)
// delete
router.delete ('/:id', auth, roleAuthorization(['admin']), productController.deleteProduct)





module.exports = router;