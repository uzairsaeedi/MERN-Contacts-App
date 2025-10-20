import axios from 'axios'
import { toast } from 'react-toastify'
import { getToken, clearAuth } from '../context/AuthHelpers'


const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'


const api = axios.create({
    baseURL: 'http://127.0.0.1:8080',
    headers: { 'Content-Type': 'application/json' }
})


// attach token
api.interceptors.request.use((config) => {
    const token = getToken()
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})


// global response handler
api.interceptors.response.use(
    (res) => res,
    (err) => {
        const status = err?.response?.status
        if (status === 401 || status === 403) {
            // clear auth and notify
            clearAuth()
            toast.error('Session expired. Please login again.')
            // optional: redirect handled by AuthContext on token removal
        } else {
            const msg = err?.response?.data?.message || err.message
            toast.error(msg)
        }
        return Promise.reject(err)
    }
)

export default api;