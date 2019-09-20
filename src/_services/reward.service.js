import axios from 'axios';

function getClaims() {
  return axios('/reward')
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

function updateClaim(id, payload) {
  return axios.put(`/reward/${id}`, payload)
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

function getLogClaim(id) {
  return axios('/reward/log', { params: { id } })
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

// function create(payload) {
//   return axios.post('/client', payload)
//     .then(res => res.data)
//     .catch(err => Promise.reject(err));
// }

// function update(payload, id) {
//   return axios.put(`/client/${id}`, payload)
//     .then(res => res.data)
//     .catch(err => Promise.reject(err));
// }

export const rewardService = {
  getClaims,
  updateClaim,
  getLogClaim,
  // create,
  // update,
};
