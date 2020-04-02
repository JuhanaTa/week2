'use strict';
const userModel = require('../models/userModel');
const {validationResult} = require('express-validator');
const users = userModel.users;

const user_list_get = async  (req, res) => {
  const users = await userModel.getUsersList();
  res.json(users);
};

const user_get = async (req, res) => {
  console.log('user id parameter', req.params);
  const user = await userModel.getUser(req.params.id);
  res.json(user);
};

const user_post = async (req, res) => {
  console.log('user_post', req.body, req.file);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const inUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  try{
    const user = await userModel.insertUser(inUser);
    console.log('inserted', user);
    res.send(`'added user: ${user.insertId}'`);
  }catch(e){
    console.error('problem with user_post in userController', e);
    res.status(500).send(`database insert error: ${e.message}`);
  }

};
const user_put = async (req, res) => {
  console.log('user_put', req.body);
  const upUser = await userModel.updateUser(req.body);
  console.log('user_put result from db', upUser);
  res.send('updated user...');
};

const user_delete = async (req, res) => {
  console.log('user_put', req.body);
  const delUser = await userModel.deleteUser(req.params.id);
  console.log('user_put result from db', delUser);
  res.json({ deleted: 'OK'});
};


module.exports = {
  user_list_get,
  user_get,
  user_post,
  user_put,
  user_delete,
};
