import { BadRequest } from '@feathersjs/errors';

const validateUser = () => async (context) => {
  if (context.result && context.cancelled) return context;
  const { data, params,app } = context;
  console.log(data);
  if (data.username) {
    let userExist = await app.service('/users')._find({query:{
      username: data.username,
    }
    }).then(createdUser => createdUser.data[0]);
    if(userExist){
      throw new BadRequest('Username already exists');
    }
  }
  const passwordRegex = /^(?=.*?[a-z])(?=.*?[0-9]).{8,32}$/;
  if (typeof params.provider === 'undefined') return context;
  if (data.password) {
    if (data.password.length < 8 || data.password.length > 32) {
      throw new BadRequest('Password must be 8-16 characters long.');
    }
    if (!passwordRegex.test(data.password)) {
      throw new BadRequest('Password must contain one lowercase letter,one number.');
    }
  }
  return context;
};

export default validateUser;
