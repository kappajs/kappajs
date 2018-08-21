export default function createComponentDataProxyHandler(context) {
  return {
    set(obj, key, value) {
      obj[key] = value;
      context._render();
      return true;
    },
  };
}
