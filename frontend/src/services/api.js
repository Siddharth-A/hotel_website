/**
 * Centralized API client for the hotel backend (using axios).
 */

import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://192.168.68.112:5600'

const client = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
})

export const api = {
  get baseUrl() {
    return client.defaults.baseURL ?? API_BASE
  },

  /** GET /api/hotels – list all hotels */
  async getHotels() {
    const { data } = await client.get('/api/hotels')
    return Array.isArray(data) ? data : []
  },

  /** GET /api/flights – list all flights */
  async getFlights() {
    const { data } = await client.get('/api/flights')
    return Array.isArray(data) ? data : []
  },

  /** GET /api/health – health check */
  async health() {
    const { data } = await client.get('/api/health')
    return data
  },
}

export default api
