import axios from 'axios';
import { getToken } from './auth.storage';


const apiBaseUrl = import.meta.env.VITE_API_URL;

if (!apiBaseUrl) {
    throw new Error("VITE_API_URL não está definida. Configure no .env ou .env.local")
}

export const apiClient = axios.create({
    baseURL: apiBaseUrl,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor: adiciona token em cada request
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Refresh token ou logout
        }
        return Promise.reject(error);
    }
);

apiClient.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});