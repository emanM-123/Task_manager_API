// eslint-disable-next-line no-unused-vars

import setIpAndUserAgent from './setIpAndUserAgent';
module.exports = function (app) {
  // Add your custom middleware here. Remember that
  
  app.use(setIpAndUserAgent(app));
};
