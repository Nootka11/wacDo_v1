const express = require('express')
const router = express.Router();
const userCtrl = require('../controllers/userController')
const auth = require('../middleware/auth')
const roleAuthorization = require('../middleware/roleMiddleware')

router.post('/signup', auth, roleAuthorization('admin'), userCtrl.signup);
router.post('/login', userCtrl.login)

module.exports = router;