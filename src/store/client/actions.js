import { clientService } from '../../_services';

export function getClient({ commit }) {
  clientService.get()
    .then((client) => {
      commit('clientSuccess', client);
    })
    .catch((err) => {
      // TODO: handle error
      // dispatch('alert/error', err, { root: true });
      console.log(err);
    });
}
