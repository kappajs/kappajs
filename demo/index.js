import Kappa from '../src/kappa';
import Store from '../src/store/store';
import './hello-world';
import './my-button';

const el = document.querySelector('.app');

// example store with state/actions
const store = new Store({
  state: {
    count: 0,
  },
  actions: {
    INCREMENT_COUNT: state => {
      state.count += 1;
    },
  },
});

export default new Kappa({ el, store });
window.Kappa = Kappa;
