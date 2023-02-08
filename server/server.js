const express = require('express');
const next = require('next');
// const http = require('http');
// const server = http.createServer(app);
// const { Server } = require('socket.io');
// const io = new Server(server);

const exp = require('constants');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const PORT = 3000;
const DB_KEY = process.env.DB_KEY;

const userController = require('./controllers/userController.js');
const dbController = require('./controllers/dbController.js');
const cookieController = require('./controllers/cookieController.js');
const aiController = require('./controllers/aiController.js');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

module.exports = nextApp;

const apiRouter = require('./routes/api.js');
const loginRouter = require('./routes/login.js');
const signupRouter = require('./routes/login.js');

nextApp.prepare().then(() => {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());

  // for rendering static content. Potentially send 'public' ??
  // app.use('/client');

  app.use('/api', apiRouter);
  app.use('/login', loginRouter);
  app.use('/signup', signupRouter);

  app.get(
    '/',
    //check for session cookie and redirect to login if missing
    cookieController.getSsidCookie,
    cookieController.verifySsidCookie,
    // validate cookie on database (query users for that ssid, see if you get anything back)
    (req, res) => res.redirect('/index')
  );

  //catch-all route
  // app.use('/', (req, res, next) =>
  //   //TODO add a 404 page to route to
  //   next({
  //     log: 'Express catch all handler caught unknown route',
  //     status: 404,
  //     message: { err: 'Route not found' },
  //   })
  // );

  app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught an unknown middleware error',
      status: 400,
      message: { err: 'An error occurred' },
    };

    const errorObj = Object.assign(defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });

  app.get('*', (req, res) => {
    return handle(req, res);
  });

  app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
  });
});

// // WEBSOCKETS
// io.on('connection', (socket) => {
//   console.log('user connected');
//   socket.on('send-message', async (body) => {
//     console.log(body);

//     const data = await dbController.sendMessageFromSocket(body);
//     console.log(data);
//     body.message;

//     io.emit('receive-message', data);
//   });

//   // Generate ai messages
//   const startAiEmit = async (socket) => {
//     const emitAiMessage = (socket, aiUserId) => {
//       setTimeout(async () => {
//         console.log('generating a new AI message...');
//         const aiMessage = await aiController.getAiMessage();
//         const messageObject = await dbController.sendAiMessageFromSocket(
//           aiMessage,
//           aiUserId
//         );

//         socket.emit('receive-message', messageObject);

//         emitAiMessage(socket, aiUserId);
//       }, Math.random() * (10000 - 5000) + 10000);
//     };

//     const aiUserId = await aiController.getAiUser();
//     emitAiMessage(socket, aiUserId);
//   };

//   startAiEmit(socket);
// });
