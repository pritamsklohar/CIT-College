import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true
});

console.log('API Base URL:', API.defaults.baseURL);

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Stale-While-Revalidate Cache Implementation
const cache = {};

try {
  const savedCache = localStorage.getItem('cit_api_cache');
  if (savedCache) {
    Object.assign(cache, JSON.parse(savedCache));
  }
} catch (e) {
  console.error('Failed to load API cache:', e);
}

const saveCacheToLocalStorage = () => {
  try {
    localStorage.setItem('cit_api_cache', JSON.stringify(cache));
  } catch (e) {
    console.error('Failed to save API cache:', e);
  }
};

const originalGet = API.get;

API.get = function (url, config) {
  // Only cache GET requests on visitor-facing pages
  const isCacheable = 
    !window.location.pathname.includes('/admin') &&
    !url.includes('/auth/me') && 
    !url.includes('/dashboard') &&
    !url.includes('/settings') &&
    !url.includes('/enquiries') &&
    !url.includes('/contact');

  if (!isCacheable) {
    return originalGet.call(API, url, config);
  }

  const cacheKey = url + (config ? JSON.stringify(config) : '');
  const cachedData = cache[cacheKey];

  return {
    then: function (onFulfilled, onRejected) {
      let resolvedFromCache = false;

      if (cachedData) {
        try {
          if (onFulfilled) {
            onFulfilled({ data: cachedData, fromCache: true });
            resolvedFromCache = true;
          }
        } catch (e) {
          console.error('Error in onFulfilled with cached data:', e);
        }
      }

      // Fetch fresh data in background
      originalGet.call(API, url, config)
        .then(response => {
          const freshData = response.data;
          const stringifiedFresh = JSON.stringify(freshData);
          const stringifiedCached = cachedData ? JSON.stringify(cachedData) : null;

          if (!resolvedFromCache || stringifiedFresh !== stringifiedCached) {
            cache[cacheKey] = freshData;
            saveCacheToLocalStorage();
            if (onFulfilled) {
              onFulfilled(response);
            }
          }
        })
        .catch(error => {
          if (!resolvedFromCache && onRejected) {
            onRejected(error);
          }
        });

      return this;
    },
    catch: function (onRejected) {
      this.then(null, onRejected);
      return this;
    }
  };
};

export default API;
