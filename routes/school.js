const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require('../controllers/schoolController')

router.post('/', auth, controller.register);
router.put('/:id', auth, controller.update);
router.get('/', auth, controller.list);
router.get('/get', auth, controller.mySchool);
router.get('/:id', auth, controller.id);
router.delete('/:id', auth, controller.delete);

module.exports = router;