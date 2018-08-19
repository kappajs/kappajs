import Kappa from '../src/kappa';
import '../src/router';
import './hello-world';
import './my-button';

const el = document.querySelector('.app');

export default new Kappa(el);