import axios from 'axios';

function get(id) {
  const payload = {};

  if (id) {
    Object.assign({}, payload, id);
  }

  return axios('/product', payload)
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

function create(payload) {
  return axios.post('/product', payload)
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

function update(payload, id) {
  return axios.put(`/product/${id}`, payload)
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

export const productService = {
  get,
  create,
  update,
};
