import URLs from '@/lib/endpoints';
import axios from 'axios';
import Cookies from 'js-cookie';

// API call without token
export const ServiceUnAuthAPI = axios.create({
    baseURL: URLs.BASE_URL,
    timeout: 50000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    }
});

// API call with Access token
export const ServiceAccessAPI = axios.create({
    baseURL: URLs.BASE_URL,
    timeout: 50000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    }
});

ServiceAccessAPI.interceptors.request.use(
    (config) => {
        const token = Cookies.get('x_a_t');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle error
        return Promise.reject(error);
    }
);