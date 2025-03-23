import axios from 'axios'

// Creating an Axios instance with the baseURL and custom headers
const serverInstance = axios.create({
  baseURL: 'https://api.open-meteo.com',
})

serverInstance.interceptors.request.use(
  (config) => {
    config.headers = {
      Accept: 'application/json',
    }
    return config
  },
  (error) => Promise.reject(error),
)

serverInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const code = error && error.response ? error.response.status : 0
    return Promise.reject(error)
  },
)

export default serverInstance
