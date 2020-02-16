'use strict';

const express =  require('express');

const basicAuth = require('./middleware/basic-auth-middleware.js');
const oauth = require('./middleware/oauth-middleware.js');
//const auth = require('./token-auth-middleware.js');
const Users = require('./users.js');

const app = express();

app.use(express.json());

app.use(express.static('./public'));


//Third party global middleware
// app.use(cors());
// app.use(morgan('dev'));


//Our middleware
// app.use(timestamp);
// app.use(logger);

app.post('/signup', async (req,res)=>{

let user = new Users(req.body);

  user.save(req.body)
    .then (user => {
      console.log(user);
      //make a token
      let token = user.generateToken();
      res.status(200).send(token)
    })
     .catch( err => {
       res.status(403).send('You cannot do this');
     })
 
});

app.post('/signin', basicAuth, (req,res) => {
  res.status(200).send(req.token);
});

app.get('/oauth',oauth,(req,res)=>{
    res.status(200).send(req.token);
});

// app.get('/secretStuff', auth,(req,res)
//  => {
//     res.send('you got mail');
// })

// app.get('/secretStuff', auth, permission('delete'),(req,res)
//  => {
//     res.send('you got mail');
// })

// because these are defined last, they end up as catch-alls.
// app.use('*', notFoundHandler);
// app.use(errorHandler);

// Export an object with the whole server and a separate method that can start the server
module.exports = {
  //exporting app for testing
  apiServer: app,
  start: (port) => {
    app.listen(port, () => console.log(`Listening on ${port}`));
  }
};