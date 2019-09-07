import { userService } from '../../_services';

export function login({ dispatch, commit }, { email, password }) {
  commit('loginRequest', { email });

  userService.login(email, password)
    .then(
      (user) => {
        commit('loginSuccess', user);
        dispatch('alert/clear', null, { root: true });
        this.$router.push('/');
      },
      (error) => {
        commit('loginPurge');
        dispatch('alert/error', error, { root: true });
      },
    );
}

export function logout({ commit }) {
  userService.logout();
  commit('loginPurge');
  this.$router.push('/login');
}
