import { getToken } from './authenticate';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Function to make authenticated GET requests
async function authenticatedGet(route) {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}${route}`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
    if (response.ok) {
      return response.json();
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error performing authenticated GET request:', error);
    return [];
  }
}

// Function to make authenticated PUT requests
async function authenticatedPut(route, data) {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}${route}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return response.json();
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error performing authenticated PUT request:', error);
    return [];
  }
}

// Function to make authenticated DELETE requests
async function authenticatedDelete(route) {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}${route}`, {
      method: 'DELETE',
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
    if (response.ok) {
      return response.json();
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error performing authenticated DELETE request:', error);
    return [];
  }
}

// Function to add a movie to the user's favorites
export async function addToFavourites(id) {
  return authenticatedPut(`/favourites/${id}`, {});
}

// Function to remove a movie from the user's favorites
export async function removeFromFavourites(id) {
  return authenticatedDelete(`/favourites/${id}`);
}

// Function to get the user's favorites
export async function getFavourites() {
  return authenticatedGet('/favourites');
}

// Function to add a movie to the user's history
export async function addToHistory(id) {
  return authenticatedPut(`/history/${id}`, {});
}

// Function to remove a movie from the user's history
export async function removeFromHistory(id) {
  return authenticatedDelete(`/history/${id}`);
}

// Function to get the user's history
export async function getHistory() {
  return authenticatedGet('/history');
}
