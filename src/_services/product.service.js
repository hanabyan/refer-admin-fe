import axios from 'axios';

function get(id) {
  return axios('/product', { params: { id } })
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
