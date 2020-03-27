'use strict';
// userRoute
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/', userController.user_list_get);

router.get('/:id', userController.user_get);

router.post('/', userController.user_post);

router.put('/', userController.user_put);
router.delete('/', userController.user_delete);



module.exports = router;
