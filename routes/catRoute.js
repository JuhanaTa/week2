'use strict';
// catRoute
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: './uploads/'});
const catController = require('../controllers/catController');
const {body, sanitizeBody} = require('express-validator');

router.get('/', catController.cat_list_get);

router.get('/:id', catController.cat_get);

router.post('/', [
    body('name', 'Min 3 chars, required').isLength({min: 1}),
    body('age', 'Must be number').isNumeric().isLength({min: 1}),
    body('weight', 'Must be number').isNumeric().isLength({min:1}),
    body('owner', 'Must be number').isNumeric().isLength({min:1}),
],
    upload.single('cat'), (req, res) => {
  console.log('tiedosto: ', req.file);
  catController.cat_post(req, res);
 // res.send('With this endpoint you can add cats');
});

router.put('/', [
  body('name', 'Min 3 chars, required').isLength({min: 1}),
  body('age', 'Must be number').isNumeric().isLength({min: 1}),
  body('weight', 'Must be number').isNumeric().isLength({min:1}),
  body('owner', 'Must be number').isNumeric().isLength({min:1}),
],
    catController.cat_put);
router.delete('/:id', catController.cat_delete);


module.exports = router;
