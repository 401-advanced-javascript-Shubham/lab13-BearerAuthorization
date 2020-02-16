'use strict';

const Users = require('../users.js');

module.exports = (req, res, next) => {
    
    let token = req.headers.authorization.split(' ').pop();

    Users.authenticateWithToken(token)
       .then(user => {
           req.user = user;
           next();
       })
       .catch(err => next('Invalid Login'));

    }