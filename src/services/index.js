const users = require('./users/users.service.js');
const task = require('./task/task.service.js');
// const logout = require('./logout.js');
const login = require('./login.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(task);
  // app.configure(logout);
  app.configure(login);
};
