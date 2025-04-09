const express = require('express');
const router = express.Router();


const menuController = require('../controllers/menuController')

router.get('/',  menuController.getAllMenus);
router.get('/:id',  menuController.getOneMenu);

// Ruta para crear un nuevo menu
router.post('/create-menu', menuController.createMenu);
//Modifier un menu
router.put('/:id/update', menuController.modifyMenu)
// delete
router.delete ('/:id/delete', menuController.deleteMenu)


module.exports = router;