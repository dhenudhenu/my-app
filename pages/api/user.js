// pages/api/user.js

import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Handle registration or login requests here
    // You can use "fetch" to communicate with your User API on Cyclic
  } else {
    res.status(405).end(); // Method Not Allowed for other HTTP methods
  }
}
