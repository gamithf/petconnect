const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function apiRequest(
  url,
  method = 'GET',
  payload,
  options = {}
) {
  const fullUrl = `${API_BASE_URL}${url}`;
  
  if (!API_BASE_URL) {
    throw new Error('API_BASE_URL is not defined in environment variables');
  }

  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(fullUrl, {
      ...options,
      method,
      headers,
      credentials: 'include', // Ensures cookies are sent
      body: payload ? JSON.stringify(payload) : undefined,
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: response.statusText };
      }
      
      const error = new Error(
        errorData.message || `API request failed with status ${response.status}`
      );
      error.status = response.status;
      error.data = errorData;
      throw error;
    }

    const data = await response.json().catch(() => ({})); // Handle empty responses
    
    return {
      data,
      status: response.status,
      headers: response.headers,
    };
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

export async function authRequest(
  url,
  method = 'POST',
  payload,
  options = {}
) {
  // Auth-specific defaults
  const authOptions = {
    ...options,
    credentials: 'include', // Important for auth requests
  };

  return apiRequest(url, method, payload, authOptions);
}

// Helper methods for common HTTP methods
export const api = {
  get: (url, options) => apiRequest(url, 'GET', undefined, options),
  post: (url, payload, options) => apiRequest(url, 'POST', payload, options),
  put: (url, payload, options) => apiRequest(url, 'PUT', payload, options),
  patch: (url, payload, options) => apiRequest(url, 'PATCH', payload, options),
  delete: (url, options) => apiRequest(url, 'DELETE', undefined, options),
};