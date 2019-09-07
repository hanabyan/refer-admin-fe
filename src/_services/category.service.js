import axios from 'axios';

function getBusiness(id) {
  const payload = {};

  if (id) {
    Object.assign({}, payload, id);
  }

  return axios('/category/business', payload)
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

function createBusiness(data) {
  const payload = { ...data };

  return axios.post('/category/business', payload)
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

function updateBusiness(data, id) {
  const payload = { ...data };

  return axios.put(`/category/business/${id}`, payload)
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

function getProduct(id) {
  const payload = {};

  if (id) {
    Object.assign({}, payload, id);
  }

  return axios('/category/product', payload)
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

function createProduct(data) {
  const payload = { ...data };

  return axios.post('/category/product', payload)
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

function updateProduct(data, id) {
  const payload = { ...data };

  return axios.put(`/category/product/${id}`, payload)
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

export const categoryService = {
  getBusiness,
  createBusiness,
  updateBusiness,
  getProduct,
  createProduct,
  updateProduct,
};
