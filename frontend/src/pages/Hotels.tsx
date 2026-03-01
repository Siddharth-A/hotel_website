import { useCallback } from 'react'
import { Container, Typography, Grid } from '@mui/material'
import HeroSection from '../components/HeroSection'
import SearchForm from '../components/SearchForm'
import HotelCard from '../components/HotelCard'
import StatusDisplay from '../components/StatusDisplay'
import { useFetch } from '../hooks/useFetch'
import api from '../services/api'
import type { Hotel } from '../types'

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=260&fit=crop'

export default function Hotels() {
  const fetchHotels = useCallback(() => api.getHotels(), [])
  const { data: hotels, loading, error } = useFetch<Hotel>(fetchHotels)

  return (
    <>
      <HeroSection title="Find your perfect stay" subtitle="Compare hotels, read reviews, and book at the best price.">
        <SearchForm />
      </HeroSection>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          All hotels
        </Typography>

        <StatusDisplay
          loading={loading}
          error={error}
          empty={!loading && !error && hotels.length === 0}
          emptyMessage="No hotels found."
          hint={`Check that the backend is running at ${api.baseUrl}`}
        />

        {!loading && !error && hotels.length > 0 && (
          <Grid container spacing={2}>
            {hotels.map((h) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={h.id}>
                <HotelCard
                  name={h.name}
                  location={[h.city, h.country].filter(Boolean).join(', ') || '—'}
                  image={h.image_url || DEFAULT_IMAGE}
                  price={h.price_per_night}
                  rating={h.rating}
                  starRating={h.star_rating}
                  reviews={h.review_count}
                  description={h.description}
                  amenities={h.amenities}
                  freeCancellation={h.free_cancellation}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  )
}
