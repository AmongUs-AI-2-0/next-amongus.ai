const express = require('express');
const router = express.Router();
const nextApp = require('../server.js');

const userController = require('../controllers/userController.js');
const dbController = require('../controllers/dbController.js');
const cookieController = require('../controllers/cookieController.js');

router.get('/', (req, res) => {
  //console.log('we are here');
  res.redirect('/signup');
  // res
  //   .status(200)
  //   .sendFile(path.resolve(__dirname, '../..', 'client', 'signup.html'));
});

router.post(
  '/',
  userController.getUserInfoFromBody,
  userController.encryptPassword,
  dbController.postUser,
  userController.generateSession,
  dbController.storeSsid,
  cookieController.setSsidCookie,
  (req, res) => {
    // console.log(res.locals);
    res, redirect('/');
    // res.status(302).redirect('/');
  }
);

module.exports = router;
