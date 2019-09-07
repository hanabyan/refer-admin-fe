import { productService } from '../../_services';

export function getProduct({ commit }) {
  productService.get()
    .then((product) => {
      commit('productSuccess', product);
    })
    .catch((err) => {
      // TODO: handle error
      // dispatch('alert/error', err, { root: true });
      console.log(err);
    });
}
