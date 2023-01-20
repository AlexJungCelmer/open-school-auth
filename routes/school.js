const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const controller = require('../controllers/schoolController')

router.post('/', (auth, isAdmin), controller.register);
router.put('/:id', (auth, isAdmin), controller.update);
router.delete('/:id', (auth, isAdmin), controller.delete);
router.get('/', (auth, isAdmin), controller.list);
router.get('/get', auth, controller.mySchool);
router.get('/:id', auth, controller.id);

module.exports = router;