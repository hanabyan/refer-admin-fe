export function loginRequest(state, user) {
  state.status = { loggingIn: true };
  state.user = user;
}

export function loginSuccess(state, user) {
  state.status = { loggedIn: true };
  state.user = user;
}

export function loginPurge(state) {
  state.status = {};
  state.user = null;
}
