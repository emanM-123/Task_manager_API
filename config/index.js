import development from './default.json';
import production from './production.json';

let Config = development;

if(process.env.NODE_ENV && process.env.NODE_ENV === 'production' ) {
  Config = production;
}

export default Config;
