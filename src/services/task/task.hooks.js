const { authenticate } = require('@feathersjs/authentication').hooks;
module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [
      async (context) => {
        const { status } = context.params.query;
        console.log(status);
        if (status && status === 'Pending') {
          context.params.query = { dueDate: { $gte : new Date() } };
        }
        if (status && status === 'Completed') {
          context.params.query = { dueDate: { $lte : new Date() } };
        }
      },
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
