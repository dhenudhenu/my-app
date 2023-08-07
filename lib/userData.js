// my-app/lib/userData.js

import fetch from 'node-fetch';
import { getToken } from './authenticate';

const createHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    Authorization: `JWT ${token}`,
  };
};

const makeRequest = async (url, method, data = null) => {
  try {
    const headers = createHeaders();
    const options = {
      method,
      headers,
      body: data ? JSON.stringify(data) : null,
    };

    const res = await fetch(url, options);
    if (res.status === 200) {
      return res.json();
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error making request:', error);
    return [];
  }
};

const addToFavourites = async (id) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`;
  return makeRequest(url, 'PUT');
};

const removeFromFavourites = async (id) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`;
  return makeRequest(url, 'DELETE');
};

const getFavourites = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/favourites`;
  return makeRequest(url, 'GET');
};

const addToHistory = async (id) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/history/${id}`;
  return makeRequest(url, 'PUT');
};

const removeFromHistory = async (id) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/history/${id}`;
  return makeRequest(url, 'DELETE');
};

const getHistory = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/history`;
  return makeRequest(url, 'GET');
};

export {
  addToFavourites,
  removeFromFavourites,
  getFavourites,
  addToHistory,
  removeFromHistory,
  getHistory,
};
