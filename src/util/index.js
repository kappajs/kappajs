export function noop() {}

export function proxyFunctionContext(obj, context) {
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'function') {
      obj[key] = obj[key].bind(context);
    }
  });

  return obj;
}

export function bindFunctionsToContext(methods, context) {
  Object.keys(methods).forEach(key => {
    if (typeof methods[key] === 'function') {
      context[key] = methods[key].bind(context);
    }
  });

  return methods;
}
