import axios from 'axios';

function get(id) {
  const payload = {};

  if (id) {
    Object.assign({}, payload, id);
  }

  return axios('/promo', payload)
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

export const promoService = {
  get,
  create,
  update,
};
