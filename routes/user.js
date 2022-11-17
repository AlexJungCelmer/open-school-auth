const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require('../controllers/userController')

router.post('/register', controller.userRegister);
router.post('/login', controller.login);
router.get('/', auth, controller.user);
router.delete('/:id', auth, controller.delete);
module.exports = router;