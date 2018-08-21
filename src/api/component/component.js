import createKappaComponent from './createKappaComponent';

const componentMap = {};

const reservedComponentApi = [
  '_render',
  'connectedCallback',
  'disconnectedCallback',
  'attributeChangedCallback',
];

export default function componentFactory(Kappa) {
  Kappa.components = {};

  return function defineComponent(name, definition) {
    if (componentMap[name]) {
      if (component[name].definition !== definition) {
        throw new Error(`The component <${name} /> is already registered`);
      } else {
        console.warn(
          'Component registered with same definition twice, ignoring',
        );
      }
    }

    const reservedKeywordUsed = Object.keys(definition).find(key =>
      reservedComponentApi.includes(key),
    );

    if (reservedKeywordUsed) {
      throw new Error(
        `The component <${name} /> contains the method ${reservedKeywordUsed} which is a reserved keyword in Kappa.js`,
      );
    }

    const component = createKappaComponent(definition, Kappa);
    Kappa.components[name] = { component, definition };
  };
}
