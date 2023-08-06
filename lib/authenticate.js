import axios from 'axios';

// Function to set the JWT token in local storage
export function setToken(token) {
  localStorage.setItem('token', token);
}

// Function to get the JWT token from local storage
export function getToken() {
  return localStorage.getItem('token');
}

// Function to remove the JWT token from local storage
export function removeToken() {
  localStorage.removeItem('token');
}

// Function to read the JWT token and extract the user data from it
export function readToken() {
  const token = getToken();
  if (token) {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  }
  return null;
}

// Function to check if the user is authenticated (i.e., has a valid JWT token)
export function isAuthenticated() {
  const token = getToken();
  if (token) {
    const payload = readToken();
    return payload.exp > Date.now() / 1000;
  }
  return false;
}

// Function to authenticate the user by making a POST request to the "/login" endpoint
export async function authenticateUser(userName, password) {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      userName,
      password,
    });
    if (response.status === 200) {
      const token = response.data.token;
      setToken(token);
      return true;
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
  }
  return false;
}

// Function to register the user by making a POST request to the "/register" endpoint
export async function registerUser(userName, password, password2) {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      userName,
      password,
      password2,
    });
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    console.error('Error registering user:', error);
  }
  return false;
}
