import axios from 'axios'
import type { Hotel, Flight, PaginatedResponse } from '../types'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5600'

const client = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
})

export interface SearchHotelsParams {
  destination?: string
  minPrice?: number
  maxPrice?: number
  minRating?: number
  freeCancellation?: boolean
  page?: number
  perPage?: number
}

export interface SearchFlightsParams {
  page?: number
  perPage?: number
}

const EMPTY_PAGE: PaginatedResponse<never> = { data: [], total: 0, page: 1, per_page: 20, pages: 0 }

function parsePaginated<T>(raw: unknown): PaginatedResponse<T> {
  if (raw && typeof raw === 'object' && 'data' in raw && Array.isArray((raw as PaginatedResponse<T>).data)) {
    return raw as PaginatedResponse<T>
  }
  return EMPTY_PAGE
}

export const api = {
  get baseUrl(): string {
    return client.defaults.baseURL ?? API_BASE
  },

  async getHotels(page = 1, perPage = 20): Promise<PaginatedResponse<Hotel>> {
    const { data } = await client.get('/hotels', { params: { page, per_page: perPage } })
    return parsePaginated<Hotel>(data)
  },

  async searchHotels(params: SearchHotelsParams): Promise<PaginatedResponse<Hotel>> {
    const { data } = await client.get('/hotels', {
      params: {
        destination: params.destination || undefined,
        min_price: params.minPrice || undefined,
        max_price: params.maxPrice || undefined,
        min_rating: params.minRating || undefined,
        free_cancellation: params.freeCancellation ? 'true' : undefined,
        page: params.page ?? 1,
        per_page: params.perPage ?? 20,
      },
    })
    return parsePaginated<Hotel>(data)
  },

  async getFlights(params?: SearchFlightsParams): Promise<PaginatedResponse<Flight>> {
    const { data } = await client.get('/flights', {
      params: {
        page: params?.page ?? 1,
        per_page: params?.perPage ?? 10,
      },
    })
    return parsePaginated<Flight>(data)
  },

  async health(): Promise<unknown> {
    const { data } = await client.get('/health')
    return data
  },
}

export default api
