const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const bcrypt = require('bcryptjs');
const { expressOauth } = require('@feathersjs/authentication-oauth');
const cookieParser = require('cookie-parser');
const Config = require('../config');
const {BadRequest} = require('@feathersjs/errors');
class CustomAuthenticationService extends AuthenticationService {
  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
}

const EmailStrategy = new LocalStrategy();
const UsernameStrategy = new LocalStrategy();
EmailStrategy.getEntityQuery = async function(query) {
  return {
    ...query,
    locked: false,
    deleted: false,
    $limit: 1
  };
};
UsernameStrategy.getEntityQuery = async function(query) {
  return {
    ...query,
    locked: false,
    deleted: false,
    $limit: 1
  };
};

export const setCookie = (req, res, next) => {
  res.cookie(
    Config.authTokenName,
    res.data.accessToken ? res.data.accessToken : '',
    {
      maxAge: res.data.accessToken ? 1 * 365 * 30 * 24 * 60 * 60 * 1000 : 0,
      httpOnly: false,
      domain: Config.domain,
      secure: !Config.domain.includes('localhost')
    }
  );
  next();
};
module.exports = app => {
  const authentication = new CustomAuthenticationService(app);
  
  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', EmailStrategy);
  authentication.register('local-username',UsernameStrategy);

  app.use('/authentication', authentication, (req, res, next) => {
    console.log(res);
    req.session.authentication = {
      strategy: 'jwt',
      accessToken: res.data.accessToken
    };
    next();
  }, setCookie);  

  const service = app.service('authentication');
  service.hooks({
    before: {
      create: [async(context) => {
           
        if(context.data.email){
          let user = await context.app.service('/users').find({
            query:{ 
              email:context.data.email
            }
          });
          if(!user.data.length){
            throw new BadRequest('user not found');
          }
        }

        delete context.params.authentication;
        return context;

      }]
    },
    after: {   create: [
      (context) => {
        return context;
      }
    ]
    }
  });
  app.configure(expressOauth());
  app.use(cookieParser());
  app.configure(expressOauth());
};
