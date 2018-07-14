import axios from 'axios'
import notie from 'notie'

axios.defaults.baseURL = 'https://www.reddit.com'

const showLoader = () => {
  const loader = document.getElementById('loader')
  if (loader) loader.style.display = 'block'
}

const hideLoader = () => {
  const loader = document.getElementById('loader')
  if (loader) loader.style.display = 'none'
}

// Request interceptor
axios.interceptors.request.use(
  config => {
    showLoader()
    return config
  },
  error => {
    hideLoader()
    Promise.reject(error)
  }
)

// Response interceptor
axios.interceptors.response.use(
  response => {
    hideLoader()
    return response
  },
  error => {
    hideLoader()
    return Promise.reject(error)
  }
)

let running = false

// Use mocked api for test environment, use async
// axios-driven api for production/development
let api
if (process && process.env && process.env.NODE_ENV === 'testing') {
  api = async function (method, url, data) {
    return await new Promise((resolve, reject) => {
      resolve({ data: data.response })
    })
  }
} else {
  api = async function (method, url, data) {
    running = true
    try {
      const data = (await axios({ method, url, data })).data
      running = false
      return data
    } catch (error) {
      running = false
      notie.force(3, 'Network error or invalid subreddit. Please try again.', 'OK', () => {
        window.location.href = '/'
      })
    }
  }
}

export { running }

export default api
