// const API_BASE_URL = import.meta.env.VITE_NODE_API_URL;

// export async function apiRequest(
//   url,
//   method = 'GET',
//   payload,
//   options = {}
// ) {
//   const fullUrl = `${API_BASE_URL}${url}`;

//   if (!API_BASE_URL) {
//     throw new Error('API_BASE_URL is not defined in environment variables');
//   }

//   const token = localStorage.getItem('token');

//   // Base headers
//   const headers = {
//     ...(token && { Authorization: `Bearer ${token}` }),
//     ...options.headers,
//   };

//   let body;
//   if (payload instanceof FormData) {
//     // Don't set Content-Type, browser will handle boundary
//     body = payload;
//   } else if (payload) {
//     headers['Content-Type'] = 'application/json';
//     body = JSON.stringify(payload);
//   }

//   try {
//     const response = await fetch(fullUrl, {
//       ...options,
//       method,
//       headers,
//       credentials: 'include',
//       body,
//     });

//     if (!response.ok) {
//       let errorData;
//       try {
//         errorData = await response.json();
//       } catch {
//         errorData = { message: response.statusText };
//       }

//       const error = new Error(
//         errorData.message || `API request failed with status ${response.status}`
//       );
//       error.status = response.status;
//       error.data = errorData;
//       throw error;
//     }

//     const data = await response.json().catch(() => ({}));
//     return { data, status: response.status, headers: response.headers };
//   } catch (error) {
//     console.error('API request failed:', error);
//     throw error;
//   }
// }

// In your api.js or wherever apiRequest is defined
import axios from 'axios';

const VITE_NODE_BASE_URL = import.meta.env.VITE_NODE_API_URL;
let authToken = sessionStorage.getItem("authToken");

const api = axios.create({
  baseURL: VITE_NODE_BASE_URL,
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
  },
  withCredentials: true, // This tells Axios to send cookies with requests
});

export const apiRequest = async (endpoint, method, payload) => {
  try {
    const response = await api({
      url: endpoint,
      method: method,
      data: payload,
    });
    const data = response.data;
    console.log('API response:', data);
    return { data, status: response.status, headers: response.headers };
  } catch (error) {
    throw error;
  }
};