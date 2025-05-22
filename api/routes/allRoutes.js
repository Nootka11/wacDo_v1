const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')
const roleAuthorization = require('../middleware/roleMiddleware')
const upload = require('../middleware/multer-config');
const User = require('../models/User');


//*** USER ***
const userCtrl = require('../controllers/userController')


router.post('/user/signup', auth, roleAuthorization('admin'), userCtrl.signup);
router.post('/user/login', userCtrl.login);
// router.post('/user/logout', userCtrl.logout);
// router.post('/reset-password', async (req, res) => {
//   const bcrypt = require('bcrypt');
//   const newPassword = await bcrypt.hash('*****', 10);
//   await User.updateOne({ username: 'Ada' }, { password: newPassword });
//   res.send('Contraseña actualizada');
// });


//*** PRODUCT ***
//=============
const productController = require('../controllers/productController')

// Route pour creer un nouveau produit
router.post('/products',auth, roleAuthorization(['admin']),  upload.single('imageUrl'),productController.createProduct);
// Route pour ajouter plusieurs produits
router.post('/products/create-multiple-products', auth, roleAuthorization(['admin']), productController.createMultipleProducts);

router.get('/products/',  productController.getAllProducts);
router.get('/products/:id',  productController.getOneProduct);



//Modifier un produit
router.put('/products/:id', auth, roleAuthorization(['admin']), upload.single('imageUrl'), productController.modifyProduct)
// delete
router.delete ('/products/:id', auth, roleAuthorization(['admin']), productController.deleteProduct)


// *** MENU ***
// ============
const menuController = require('../controllers/menuController')

// Route pour creer un nouveau menu
router.post('/menus', auth, roleAuthorization(['admin']), upload.single('image'), menuController.createMenu);

router.get('/menus',  menuController.getAllMenus);
router.get('/menus/:id',  menuController.getOneMenu);


//Modifier un menu
router.put('/menus/:id', auth, roleAuthorization(['admin']), upload.single('image'),  menuController.modifyMenu)
// delete
router.delete ('/menus/:id',  auth, roleAuthorization(['admin']), menuController.deleteMenu)


// *** ORDERS ***
//==============

const orderController = require('../controllers/orderController');

// Route afficher toutes les commandes
router.get('/orders', orderController.getAllOrders);

// Ruta pour creer une nouvelle commande
router.post('/orders',  auth, roleAuthorization(['admin','accueil']),orderController.createOrder);


// Ruta para obtener una orden específica por su ID
router.get('/orders/:id', orderController.getOneOrder);

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