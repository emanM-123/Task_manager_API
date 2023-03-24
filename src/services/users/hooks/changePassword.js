// import {GlobalRedisClient} from '../../../redis';
import {BadRequest} from '@feathersjs/errors';
import bcrypt from 'bcryptjs';

const changePassword = () => async context =>{
  const {data} = context;
  const {user} =  context.params;
  const userId = context.arguments[0];
  const {oldPassword, newPassword, confirmPassword} = data;
  if(!oldPassword && !newPassword && !confirmPassword) return context;

  let allowed = false;

  if((userId && userId.toString() !== (user && user._id.toString()))){
    throw new BadRequest('You cannot change password of other user!');
  }

  if( !newPassword || !confirmPassword){
    throw new BadRequest('New Password and confirm password are required!');
  }

  if(newPassword !== confirmPassword){
    throw new BadRequest('New Password and confirm password are not equal!');
  }
  if(user && user.password){
    if(allowed){
      context.data.password = newPassword;
    }else{
      if(!oldPassword) throw new BadRequest('Old password is required!');

      const status = await bcrypt.compareSync(oldPassword, user.password);
    
      if(status){
        context.data.password = newPassword;
      }else{
        throw new BadRequest('Old Password is not correct!');
      }
    }
        
  }else{
    context.data.password = newPassword;
  }
  return context;
};

export default changePassword;