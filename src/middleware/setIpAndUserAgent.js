
export default function(app) {
  return function next(req, res, next) {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    req.feathers.ip = ip.split(',')[0];
    req.feathers.cookies = JSON.parse(JSON.stringify(req.cookies));
    req.feathers.userAgent = req.headers['user-agent'];
    const token = req.cookies && req.cookies[app.get('authTokenName')] ? req.cookies[app.get('authTokenName')] : null;
    if(token) {
      req.headers['Authentication'] = `Bearer ${token}`;
    }
    next();
  };
}