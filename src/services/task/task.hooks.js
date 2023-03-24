const { authenticate } = require('@feathersjs/authentication').hooks;
import getDataBySort from './hooks/getTaskBySort';
module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [getDataBySort()],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
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
