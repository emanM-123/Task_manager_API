const { authenticate } = require('@feathersjs/authentication').hooks;
import validateUser from './hooks/validateUser';
import changePassword from './hooks/changePassword';
const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;
module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [
      validateUser(),
      hashPassword('password'),
    ],
    update: [
      authenticate('jwt'),
      validateUser(),
      changePassword(),
      hashPassword('password'), 
    ],
    patch: [hashPassword('password'), authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      protect('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
