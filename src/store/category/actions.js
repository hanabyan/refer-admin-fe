import { categoryService } from '../../_services';

export function getBusiness({ commit }) {
  categoryService.getBusiness()
    .then((businessCategory) => {
      commit('businessGetSuccess', businessCategory);
    })
    .catch((err) => {
      // TODO: handle error
      // dispatch('alert/error', err, { root: true });
      console.log(err);
      return err;
    });
}

export function getProduct({ commit }) {
  categoryService.getProduct()
    .then((productCategory) => {
      commit('productGetSuccess', productCategory);
    })
    .catch((err) => {
      // TODO: handle error
      // dispatch('alert/error', err, { root: true });
      console.log(err);
      return err;
    });
}
