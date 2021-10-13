import axios from 'axios'

// axiosInstance to make api calls
export const axiosInstance = axios.create({
  baseURL: `https://api.openweathermap.org/data/2.5`,
  timeout: 60000,
})

// Request interceptor
axios.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

// Response interceptor
axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  },
)
