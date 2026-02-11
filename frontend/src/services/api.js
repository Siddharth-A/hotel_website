/**
 * Centralized API client for the hotel backend.
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://192.168.68.112:5600'

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export const api = {
  get baseUrl() {
    return API_BASE
  },

  /** GET /api/hotels – list all hotels */
  async getHotels() {
    const data = await request('/api/hotels')
    return Array.isArray(data) ? data : []
  },

  /** GET /api/health – health check */
  async health() {
    return request('/api/health')
  },
}

export default api
