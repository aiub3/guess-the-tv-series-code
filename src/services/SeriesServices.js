import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://www.episodate.com/api/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getTopSeries(page) {
    return apiClient.get('/most-popular?page=' + page)
  },
  getLevelSerie(id) {
    return apiClient.get('show-details?q=' + id)
  }
}
