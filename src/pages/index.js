import Login from './components/login.jsx';
import Signup from './components/signup.jsx';
import Link from 'next/link';
import { Router, Route } from 'next/router';
// const fs = require('fs');

// require('dotenv').config();
// const Server = require('../../server/server.js');
// const begin = async () => {
//   await new Server(process.env.EXPRESS_PORT).start();
//   console.log(
//     `Server running in --- ${process.env.NODE_ENV} --- on port ${process.env.EXPRESS_PORT}`
//   );
// };
// begin();

export default function App() {
  return (
    <ul>
      <li>
        <Link href='/signup'>Go to signup page</Link>
      </li>
    </ul>
  );
}
