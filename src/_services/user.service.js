import axios from 'axios';

function logout() {
  localStorage.removeItem('user');
}

function login(email, password) {
  return axios('/auth/login', {
    method: 'post',
    data: { email, password },
  })
    .then((response) => {
      if (response && response.data && response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    })
    .catch((err) => {
      logout();
      return Promise.reject(err.response.data);
    });
}

export const userService = {
  login,
  logout,
};
