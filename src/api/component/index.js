import createKappaComponentFactory from './component';

export default function initKappaComponent(Kappa) {
  Kappa.component = createKappaComponentFactory(Kappa);
}
