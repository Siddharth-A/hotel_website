import axios from 'axios'
import type { Hotel, Flight } from '../types'

const API_BASE = import.meta.env.VITE_API_URL || 'http://192.168.68.112:5600'

const client = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
})

export const api = {
  get baseUrl(): string {
    return client.defaults.baseURL ?? API_BASE
  },

  async getHotels(): Promise<Hotel[]> {
    const { data } = await client.get('/hotels')
    return Array.isArray(data) ? data : []
  },

  async getFlights(): Promise<Flight[]> {
    const { data } = await client.get('/flights')
    return Array.isArray(data) ? data : []
  },

  async health(): Promise<unknown> {
    const { data } = await client.get('/health')
    return data
  },
}

export default api
