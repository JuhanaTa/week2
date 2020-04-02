const pool = require('../database/db');
const promisePool = pool.promise();

const  getUsersList = async () =>{
  //SELECT user_id, name, email FROM wop_user
  const [rows] = await promisePool.query('SELECT user_id, name, email FROM wop_user');
  return rows;
};

const getUser = async (id) =>{
  try {
    const [rows] = await promisePool.query('SELECT * FROM wop_user WHERE user_id = ?', [ id ]);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

const insertUser = async (user) => {
  try {
    const [rows] = await promisePool.query('INSERT INTO wop_user (name, email, password) VALUES (?, ?, ?)', [ user.name, user.email, user.password ]);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

const updateUser = async (user) => {
  try {
    const [rows] = await promisePool.query('UPDATE wop_user SET name = ?, email = ?, password = ?', [ user.name, user.email, user.password ]);
    return rows;
  } catch (e) {
    console.error('updateUser model crash', e.message);
  }
};

const  deleteUser = async (id) =>{
  try {
    console.log('delete user', id);
    const [rows] = await promisePool.query('DELETE FROM wop_user WHERE wop_user.user_id = ?', [id]);
    console.log('deleted?', rows);
    return rows
  }catch (e) {
    console.error('deleteUser model', e.message);
  }
};

const getUserLogin = (email) => {
  const user = users.filter((usr) => {
    if (usr.email === email) {
      return usr;
    }
  });
  return user[0];
};

module.exports = {
  getUsersList,
  getUser,
  insertUser,
  deleteUser,
  updateUser,
  getUserLogin,
};

