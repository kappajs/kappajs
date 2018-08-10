import { initKappaComponent } from "./api/component";

export default class Kappa {
  constructor(el) {
    this.el = el;
    console.log("Kappa bootstrapped");
  }
}

initKappaComponent(Kappa);
