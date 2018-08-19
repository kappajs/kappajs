// add logs to history

const pushState = history.pushState;
const popState = history.popState;
const replaceState = history.replaceState;

history.pushState = function(data, title, url) {
  if (url !== location.pathname && data === history.data) {
    pushState.call(this, data, title, url);
    dispatchEvent(new CustomEvent('stateChanged', { data, url }));
  }
}

history.popState = function(data, title, url) {
  if (url !== location.pathname && data === history.data) {
    popState.call(this, data, title, url);
    dispatchEvent(new CustomEvent('stateChanged', { data, url }));
  }
}

history.replaceState = function(data, title, url) {
  if (url !== location.pathname && data === history.data) {
    replaceState.call(this, data, title, url);
    dispatchEvent(new CustomEvent('stateChanged', { data, url }));
  }
}

window.onpopstate = function() {
  dispatchEvent(new CustomEvent('stateChanged', { 
    data: history.state, 
    url: this.location.pathname 
  }));
}

export function subscribeToHistoryChange (cb) {
  addEventListener('stateChanged', cb);
}