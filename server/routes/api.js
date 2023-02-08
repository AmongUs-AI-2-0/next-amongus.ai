const express = require('express');
const nextApp = require('../server.js');
const router = express.Router();

const dbController = require('../controllers/dbController.js');
const cookieController = require('../controllers/cookieController.js');
const { default: next } = require('next');

router.get('/messages', dbController.getMessages, (req, res) => {
  return nextApp.render(req, res, '/messages', {
    messages: res.locals.messages,
  });
});

router.post('/messages', dbController.postMessages, (req, res) => {
  return nextApp.render(req, res, '/messages', {
    messages: res.locals.newMessage,
  });
});

// get a full list of users
router.get('/users', dbController.getUsers, (req, res) => {
  return nextApp.render(req, res, '/users', { users: res.locals.users });
});

router.get('/users/:username', dbController.getUserByUsername, (req, res) => {
  const { user } = res.locals;
  return nextApp.render(req, res, '/users/:username', user);
});

//get user_id by SSID cookie
router.get(
  '/user_id',
  cookieController.getSsidCookie,
  cookieController.verifySsidCookie,
  dbController.getUserBySsid,
  (req, res) => {
    const { user_id } = res.locals;
    return nextApp.render(req, res, '/user_id', { user_id: user_id });
  }
);

// create a new user with username, password and email...
router.post('/users', dbController.postUser, (req, res) => {
  const { user } = res.locals;

  return nextApp.render(req, res, '/users', user);
});

module.exports = router;
