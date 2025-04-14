const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const roleAuthorization = require('../middleware/roleMiddleware')


const menuController = require('../controllers/menuController')

// Ruta para crear un nuevo menu
router.post('/create-menu', auth, roleAuthorization(['admin']), menuController.createMenu);

router.get('/',  menuController.getAllMenus);
router.get('/:id',  menuController.getOneMenu);


//Modifier un menu
router.put('/:id/update', auth, roleAuthorization(['admin']), menuController.modifyMenu)
// delete
router.delete ('/:id/delete',  auth, roleAuthorization(['admin']), menuController.deleteMenu)


module.exports = router;