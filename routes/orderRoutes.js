const express = require('express');
const router = express.Router();

// Requiere el controlador de órdenes
const orderController = require('../controllers/orderController');

// Ruta para obtener todas las órdenes
router.get('/', orderController.getAllOrders);

// Ruta para obtener las órdenes pendientes
router.get('/pending', orderController.getPendingOrders);

// Ruta para obtener las órdenes en preparación
router.get('/preparing', orderController.getPreparingOrders);

// Ruta para obtener las órdenes completadas
router.get('/completed', orderController.getCompletedOrders);

// Ruta para obtener una orden específica por su ID
router.get('/:id', orderController.getOneOrder);

// Ruta para crear una nueva orden
router.post('/create-order', orderController.createOrder);

// Ruta para actualizar una orden (por ejemplo, marcarla como preparada)
router.put('/:id', orderController.updateOrder);

// Rutas para manejar el estado de las órdenes
router.put('/:id/pending', orderController.setPending);       // Para cambiar a "pending"
router.put('/:id/preparing', orderController.setPreparing);   // Para cambiar a "preparing"
router.put('/:id/completed', orderController.setCompleted);   // Para cambiar a "completed"

// Ruta para eliminar una orden
router.delete('/:id', orderController.deleteOrder);

module.exports = router;