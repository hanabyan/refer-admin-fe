import axios from 'axios';

function get(payload) {
  return axios('/withdrawal', payload)
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

function update(payload, id) {
  return axios.put(`/withdrawal/${id}`, payload)
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

function getBalance(id) {
  return axios(`/withdrawal/balance/${id}`)
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

export const withdrawalService = {
  get,
  update,
  getBalance,
};
