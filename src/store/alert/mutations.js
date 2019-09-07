export function success(state, message) {
  state.type = 'positive';
  state.message = message;
}

export function error(state, message) {
  state.type = 'negative';
  state.message = message;
}

export function clear(state) {
  state.type = null;
  state.message = null;
}
