const mongoose = require('mongoose');
const logger = require('./logger');

module.exports = function (app) {
  mongoose
    .connect(app.get('mongodb'), {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .catch((err) => {
      logger.error(err);
      process.exit(1);
    });
  const dbref = require('mongoose-dbref');
  dbref.install(mongoose);
  var loaded = mongoose.set('debug', process.env.NODE_ENV === 'development');
  logger.info(loaded);
  mongoose.set('debug', true);
  app.set('mongooseClient', mongoose);
};
