const express = require('express');
const router = express.Router();
const nextApp = require('../server.js');

const userController = require('../controllers/userController.js');
const dbController = require('../controllers/dbController.js');
const cookieController = require('../controllers/cookieController.js');

router.get('/', (req, res) => {
  // res
  //   .status(200)
  //   .sendFile(path.resolve(__dirname, '../..', 'client', 'login.html'));
  return res.redirect('/login');
});

router.post(
  '/',
  userController.getUserInfoFromBody,
  userController.verifyUsername,
  userController.verifyPassword,
  userController.generateSession,
  dbController.storeSsid,
  cookieController.setSsidCookie,
  (req, res) => {
    // res.status(302).redirect('/');
    return res.redirect('/');
  }
);

module.exports = router;
