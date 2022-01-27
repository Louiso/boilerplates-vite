import axios from 'axios'

const instances = {
  server: axios.create({
    baseURL: String(import.meta.env.VITE_SERVER_URL) || 'http://localhost:5000',
    // transformRequest: [(data, headers) => {
    //   if (headers) { headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}}` }
    //   return data
    // }],
  }),
}

export default instances
