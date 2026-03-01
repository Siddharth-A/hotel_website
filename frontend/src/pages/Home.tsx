import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Container, Grid, Typography, Card, CardMedia, Box, Paper, TextField, Button, Stack,
} from '@mui/material'
import HeroSection from '../components/HeroSection'
import SearchForm from '../components/SearchForm'
import HotelCard from '../components/HotelCard'

const POPULAR_DESTINATIONS = [
  { id: 1, name: 'Paris', country: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop' },
  { id: 2, name: 'Tokyo', country: 'Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop' },
  { id: 3, name: 'New York', country: 'USA', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop' },
  { id: 4, name: 'Bali', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop' },
]

const FEATURED_HOTELS = [
  { id: 1, name: 'Grand Plaza Hotel', location: 'Paris, France', price: 189, rating: 4.8, reviews: 1243, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=260&fit=crop' },
  { id: 2, name: 'Sakura Resort & Spa', location: 'Tokyo, Japan', price: 312, rating: 4.9, reviews: 892, image: 'https://picsum.photos/seed/sakura-resort/400/260' },
  { id: 3, name: 'Manhattan Suites', location: 'New York, USA', price: 245, rating: 4.7, reviews: 2104, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=260&fit=crop' },
  { id: 4, name: 'Ubud Haven', location: 'Bali, Indonesia', price: 156, rating: 4.9, reviews: 756, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=260&fit=crop' },
]

const WHY_US = [
  { icon: '✓', title: 'Best Price Guarantee', text: "Find a lower rate and we'll match it." },
  { icon: '★', title: 'Verified Reviews', text: 'Real stays from real guests.' },
  { icon: '💳', title: 'Free Cancellation', text: 'Most stays can be cancelled for free.' },
  { icon: '💬', title: '24/7 Support', text: "We're here whenever you need us." },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <>
      <HeroSection title="Find your perfect stay" subtitle="Compare hotels, read reviews, and book at the best price.">
        <SearchForm onSubmit={() => navigate('/hotels')} />
      </HeroSection>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Popular destinations */}
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Popular destinations
        </Typography>
        <Grid container spacing={2} sx={{ mb: 5 }}>
          {POPULAR_DESTINATIONS.map((d) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={d.id}>
              <Card
                component={Link}
                to={`/hotels?destination=${encodeURIComponent(d.name)}`}
                sx={{ textDecoration: 'none', position: 'relative', display: 'block', overflow: 'hidden' }}
              >
                <CardMedia component="img" height={180} image={d.image} alt={d.name} loading="lazy" />
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    p: 1.5,
                  }}
                >
                  <Typography fontWeight={700} color="white">{d.name}</Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)' }}>
                    {d.country}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Featured hotels */}
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Featured hotels
        </Typography>
        <Grid container spacing={2} sx={{ mb: 5 }}>
          {FEATURED_HOTELS.map((h) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={h.id}>
              <HotelCard
                name={h.name}
                location={h.location}
                image={h.image}
                price={h.price}
                rating={h.rating}
                reviews={h.reviews}
              />
            </Grid>
          ))}
        </Grid>

        {/* Why book with us */}
        <Typography variant="h5" fontWeight={700} gutterBottom textAlign="center">
          Why book with us
        </Typography>
        <Grid container spacing={3} sx={{ mb: 5, justifyContent: 'center' }}>
          {WHY_US.map((item, i) => (
            <Grid size={{ xs: 6, sm: 3 }} key={i}>
              <Stack alignItems="center" textAlign="center" spacing={1}>
                <Typography fontSize={28}>{item.icon}</Typography>
                <Typography fontWeight={600}>{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">{item.text}</Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>

        {/* Newsletter CTA */}
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Save 10% on your next stay
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Sign up for our newsletter and get exclusive deals.
          </Typography>
          <Stack
            component="form"
            direction="row"
            spacing={1}
            justifyContent="center"
            sx={{ maxWidth: 400, mx: 'auto' }}
            onSubmit={(e: FormEvent) => e.preventDefault()}
          >
            <TextField size="small" placeholder="Enter your email" type="email" sx={{ flex: 1 }} />
            <Button type="submit" variant="contained">Subscribe</Button>
          </Stack>
        </Paper>
      </Container>
    </>
  )
}
