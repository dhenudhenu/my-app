// my-app/lib/authenticate.js

import fetch from 'node-fetch';

const setToken = (token) => {
  localStorage.setItem('token', token);
};

const getToken = () => {
  return localStorage.getItem('token');
};

const removeToken = () => {
  localStorage.removeItem('token');
};

const readToken = () => {
  const token = getToken();
  if (token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  }
  return null;
};

const isAuthenticated = () => {
  const token = getToken();
  return token ? true : false;
};

const authenticateUser = async (user, password) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, password }),
    });

    if (res.status === 200) {
      const data = await res.json();
      setToken(data.token);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    return false;
  }
};

const registerUser = async (user, password, password2) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, password, password2 }),
    });

    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error registering user:', error);
    return false;
  }
};

export {
  setToken,
  getToken,
  removeToken,
  readToken,
  isAuthenticated,
  authenticateUser,
  registerUser,
};
