import jwtDecode from 'jwt-decode';

function get() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return user.token;
  }

  return null;
}

function validate() {
  const token = get();
  if (token) {
    const decoded = jwtDecode(token);
    const now = new Date().getTime() / 1000;

    return decoded.exp > now;
  }

  return false;
}

export default {
  get,
  validate,
};
