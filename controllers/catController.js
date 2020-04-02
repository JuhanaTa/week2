'use strict';
const catModel = require('../models/catModel');
const {validationResult} = require('express-validator');

const cats = catModel.cats;

const cat_list_get = async (req, res) => {
  const cats = await catModel.getAllCats();
  res.json(cats);
};

const cat_get =  async (req, res) => {
  console.log('cat id parameter', req.params);
  const cat = await catModel.getCat(req.params.id);
  res.json(cat);
};

const cat_post = async (req, res) => {
  console.log('cat_post', req.body, req.file);
  let errors = validationResult(req);

  if(!req.file.mimetype.includes('image')){
    errors = [{msg: 'not image'}];
  }

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const inCat = {
    name: req.body.name,
    age: req.body.age,
    weight: req.body.weight,
    owner: req.body.owner,
    filename: req.file.filename,
  };
  try{
  const cat = await catModel.insertCat(inCat);
  console.log('inserted', cat);
  res.send(`'added cat: ${cat.insertId}'`);
  }catch(e){
    console.error('problem with cat_post in catController', e);
    res.status(500).send(`database insert error: ${e.message}`);
  }
  
  };

const cat_put = async (req, res) => {
  console.log('cat_put', req.body);
  const upCat = await catModel.updateCat(req.body);
  console.log('cat_put result from db', upCat);
  res.send('updated cat...');
};

const cat_delete = async (req, res) => {
  console.log('cat_put', req.body);
  const delCat = await catModel.deleteCat(req.params.id);
  console.log('cat_put result from db', delCat);
  res.json({ deleted: 'OK'});
};

module.exports = {
  cat_list_get,
  cat_get,
  cat_post,
  cat_put,
  cat_delete,
};
