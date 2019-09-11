import axios from 'axios';

export default async ({ Vue }) => {
  axios.defaults.baseURL = '/admin';

  axios.interceptors.request.use((config) => {
    // TODO: need to recheck again, against refresh token etc
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
      config.headers.Authorization = user.token;
    }

    return config;
  }, error => Promise.reject(error));

  // TODO: set interceptors response if needed
  // axios.interceptors.response.use();

  Vue.prototype.$axios = axios;
  Vue.prototype.$log = console.log;
};
