const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const bcrypt = require('bcryptjs');
const { expressOauth } = require('@feathersjs/authentication-oauth');
const cookieParser = require('cookie-parser');
class CustomAuthenticationService extends AuthenticationService {
  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
}

module.exports = app => {
  const authentication = new CustomAuthenticationService(app);
  
  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy({
    entity: 'users',
    service: 'users',
    usernameField: 'email',
    passwordField: 'password',
    hashPassword: authentication.hashPassword.bind(authentication),
    comparePassword: authentication.comparePassword.bind(authentication),
  }));


  app.use('/authentication', authentication);
  app.configure(expressOauth());
  app.use(cookieParser());
  app.configure(expressOauth());
};
