const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/users');

router.post('/register', userController.create);
router.post('/auth', userController.authenticate);
router.get('/list', userController.list);

module.exports = router;