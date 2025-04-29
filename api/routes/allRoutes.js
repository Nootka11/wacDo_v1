const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')
const roleAuthorization = require('../middleware/roleMiddleware')


//*** USER ***
const userCtrl = require('../controllers/userController')


router.post('/user/signup', auth, roleAuthorization('admin'), userCtrl.signup);
router.post('/user/login', userCtrl.login)


//*** PRODUCT ***
//=============
const productController = require('../controllers/productController')

// Ruta para crear un nuevo producto
router.post('/products',auth, roleAuthorization(['admin']), productController.createProduct);
// Ruta para añadir varios productos a la vez
router.post('/products/create-multiple-products', auth, roleAuthorization(['admin']), productController.createMultipleProducts);

router.get('/products/',  productController.getAllProducts);
router.get('/products/:id',  productController.getOneProduct);
// Ruta para obtener productos por categoría
router.get('/products/category/:category', productController.getProductsByCategory);


//Modifier un produit
router.put('/products/:id', auth, roleAuthorization(['admin']), productController.modifyProduct)
// delete
router.delete ('/products/:id', auth, roleAuthorization(['admin']), productController.deleteProduct)


// *** MENU ***
// ============
const menuController = require('../controllers/menuController')

// Ruta para crear un nuevo menu
router.post('/menus', auth, roleAuthorization(['admin']), menuController.createMenu);

router.get('/menus',  menuController.getAllMenus);
router.get('/menus/:id',  menuController.getOneMenu);


//Modifier un menu
router.put('/menus/:id', auth, roleAuthorization(['admin']), menuController.modifyMenu)
// delete
router.delete ('/menus/:id',  auth, roleAuthorization(['admin']), menuController.deleteMenu)


// *** ORDERS ***
//==============
// Requiere el controlador de órdenes
const orderController = require('../controllers/orderController');

// Ruta para obtener todas las órdenes
router.get('/orders', orderController.getAllOrders);
// Ruta para crear una nueva orden

router.post('/orders',  auth, roleAuthorization(['admin','accueil']),orderController.createOrder);

// Ruta para obtener las órdenes pendientes
router.get('/orders/pending', orderController.getPendingOrders);

// Ruta para obtener las órdenes en preparación
router.get('/orders/preparing', orderController.getPreparingOrders);

// Ruta para obtener las órdenes completadas
router.get('/orders/completed', orderController.getCompletedOrders);



// Ruta para obtener una orden específica por su ID
router.get('/orders/:id', orderController.getOneOrder);



//setDelivered setCancelled

// Ruta para actualizar una orden (por ejemplo, marcarla como preparada)
router.put('/orders/:id', auth, roleAuthorization(['admin', 'preparateur']),orderController.updateOrder);

// Rutas para manejar el estado de las órdenes
router.put('/orders/:id/pending', auth, roleAuthorization(['admin', 'preparateur']), orderController.setPending);       // Para cambiar a "pending"
router.put('/orders/:id/preparing', auth, roleAuthorization(['admin', 'preparateur']), orderController.setPreparing);   // Para cambiar a "preparing"
router.put('/orders/:id/completed', auth, roleAuthorization(['admin', 'preparateur']), orderController.setCompleted);   // Para cambiar a "completed"
router.put('/orders/:id/delivered', auth, roleAuthorization(['admin', 'preparateur', 'accueil']), orderController.setDelivered);
router.put('/orders/:id/cancelled', auth, roleAuthorization(['admin']), orderController.setCancelled);

// Ruta para eliminar una orden
router.delete('/orders/:id', auth, roleAuthorization(['admin']),orderController.deleteOrder);

module.exports = router;