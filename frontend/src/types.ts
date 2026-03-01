export interface Hotel {
  id: number | string
  name: string
  city?: string
  country?: string
  image_url?: string
  rating?: number
  star_rating?: number
  review_count?: number
  description?: string
  amenities?: string[]
  price_per_night?: number
  free_cancellation?: number
}

export interface Flight {
  id: number | string
  airline: string
  flight_number: string
  origin: string
  destination: string
  departure_time?: string
  duration_hours?: number
  price?: number
  type?: string
}
