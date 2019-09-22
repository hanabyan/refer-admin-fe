import axios from 'axios';

function get(id) {
  return axios(`/promo${id ? `/${id}` : ''}`)
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

function create(payload) {
  return axios.post('/promo', payload)
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

function update(payload, id) {
  return axios.put(`/promo/${id}`, payload)
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

function updatePromoProduct(payload, id) {
  return axios.put(`/promo/product/${id}`, payload)
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

function getPromoProduct(id) {
  return axios(`/promo/product${id ? `/${id}` : ''}`)
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

function getPromoFeatured() {
  return axios('/promo/featured')
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

function getPromoFeaturedNew(id) {
  return axios('/promo/featured/new', { params: { id } })
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

function updateFeatured(payload) {
  return axios.put('/promo/featured', payload)
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

export const promoService = {
  get,
  create,
  update,
  updatePromoProduct,
  getPromoProduct,
  getPromoFeatured,
  getPromoFeaturedNew,
  updateFeatured,
};
