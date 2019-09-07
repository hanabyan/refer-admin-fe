import axios from 'axios';

function get(id) {
  const payload = {};

  if (id) {
    Object.assign({}, payload, id);
  }

  return axios('client', payload)
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

function create(payload) {
  return axios.post('/client', payload)
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

function update(payload, id) {
  return axios.put(`/client/${id}`, payload)
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

export const clientService = {
  get,
  create,
  update,
};
