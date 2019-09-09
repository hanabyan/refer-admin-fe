import { productService } from '../../_services';

export function getProduct({ commit }, id) {
  productService.get(id)
    .then((product) => {
      commit('productSuccess', product);
    })
    .catch((err) => {
      // TODO: handle error
      // dispatch('alert/error', err, { root: true });
      console.log(err);
    });
}
