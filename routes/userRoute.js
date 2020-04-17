/*'use strict';
// userRoute
const express = require('express');
const router = express.Router();
const {body, sanitizeBody} = require('express-validator');
const userController = require('../controllers/userController');


router.get('/', userController.user_list_get);

router.get('/:id', userController.user_get);

router.post('/', [
    body('name', 'Min 3 chars, required').isLength({min: 3}),
    body('email', 'Must be email type').isEmail(),
    //body('password', 'Must have one capital letter and length at least 8 characters').matches('?=.*[A-Z].{8,}'),
],
    userController.user_post);
router.post('/', [
    body('name', 'Min 3 chars, required').isLength({min: 3}),
    body('email', 'Must be email type').isEmail(),
    body('password', 'Min 8 chars, at least one capital letter')
        .matches('(?=.*[A-Z]).{8,}'),
],
    userController.user_post);



router.put('/',[
    body('name', 'Min 3 chars, required').isLength({min: 3}),
    body('email', 'Must be email type').isEmail(),
        body('password', 'Min 8 chars, at least one capital letter')
            .matches('(?=.*[A-Z]).{8,}'),
],
    userController.user_put);

router.delete('/', userController.user_delete);



module.exports = router;*/
'use strict';
// userRoute
const express = require('express');
const router = express.Router();
const {body, sanitizeBody} = require('express-validator');
const userController = require('../controllers/userController');

router.get('/', userController.user_list_get);

router.get('/:id', userController.user_get);

router.post('/hack', (req, res) => {
    res.send(req.body.search);
});

/*router.post('/', [
  body('name', 'Min 3 chars, required').isLength({min: 3}),
  body('email', 'Not valid email address').isEmail(),
  body('passwd', 'Min 8 chars, at least one capital letter')
  .matches('(?=.*[A-Z]).{8,}'),
], userController.user_post);
*/
router.put('/', userController.user_put);

router.delete('/:id', userController.user_delete);

module.exports = router;

