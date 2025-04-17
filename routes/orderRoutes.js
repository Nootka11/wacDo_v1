const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const roleAuthorization = require('../middleware/roleMiddleware')

// Requiere el controlador de órdenes
const orderController = require('../controllers/orderController');

// Ruta para obtener todas las órdenes
router.get('/', orderController.getAllOrders);
// Ruta para crear una nueva orden

router.post('/',  auth, roleAuthorization(['admin','accueil']),orderController.createOrder);

// Ruta para obtener las órdenes pendientes
router.get('/pending', orderController.getPendingOrders);

// Ruta para obtener las órdenes en preparación
router.get('/preparing', orderController.getPreparingOrders);

// Ruta para obtener las órdenes completadas
router.get('/completed', orderController.getCompletedOrders);



// Ruta para obtener una orden específica por su ID
router.get('/:id', orderController.getOneOrder);



//setDelivered setCancelled

// Ruta para actualizar una orden (por ejemplo, marcarla como preparada)
router.put('/:id', auth, roleAuthorization(['admin', 'preparateur']),orderController.updateOrder);

// Rutas para manejar el estado de las órdenes
router.put('/:id/pending', auth, roleAuthorization(['admin', 'preparateur']), orderController.setPending);       // Para cambiar a "pending"
router.put('/:id/preparing', auth, roleAuthorization(['admin', 'preparateur']), orderController.setPreparing);   // Para cambiar a "preparing"
router.put('/:id/completed', auth, roleAuthorization(['admin', 'preparateur']), orderController.setCompleted);   // Para cambiar a "completed"
router.put('/:id/delivered', auth, roleAuthorization(['admin', 'preparateur', 'accueil']), orderController.setDelivered);
router.put('/:id/cancelled', auth, roleAuthorization(['admin']), orderController.setCancelled);

// Ruta para eliminar una orden
router.delete('/:id', auth, roleAuthorization(['admin']),orderController.deleteOrder);

module.exports = router;