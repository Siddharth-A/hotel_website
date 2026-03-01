import { useState, useCallback } from 'react'
import { Container, Typography, Grid, ToggleButtonGroup, ToggleButton, Stack } from '@mui/material'
import HeroSection from '../components/HeroSection'
import FlightCard from '../components/FlightCard'
import StatusDisplay from '../components/StatusDisplay'
import { useFetch } from '../hooks/useFetch'
import api from '../services/api'
import type { Flight } from '../types'

type FlightFilter = 'all' | 'direct' | 'indirect'

export default function Flights() {
  const fetchFlights = useCallback(() => api.getFlights(), [])
  const { data: flights, loading, error } = useFetch<Flight>(fetchFlights)
  const [filter, setFilter] = useState<FlightFilter>('all')

  const filtered = filter === 'all'
    ? flights
    : flights.filter((f) => (f.type || '').toLowerCase() === filter)

  return (
    <>
      <HeroSection
        title="Find flights"
        subtitle="Compare direct and indirect flights and book at the best price."
      />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1} mb={2}>
          <Typography variant="h5" fontWeight={700}>Flights</Typography>

          {!loading && !error && flights.length > 0 && (
            <ToggleButtonGroup
              value={filter}
              exclusive
              onChange={(_, v) => v && setFilter(v)}
              size="small"
            >
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="direct">Direct</ToggleButton>
              <ToggleButton value="indirect">Indirect</ToggleButton>
            </ToggleButtonGroup>
          )}
        </Stack>

        <StatusDisplay
          loading={loading}
          error={error}
          empty={!loading && !error && flights.length === 0}
          emptyMessage="No flights found."
          hint={`Check that the backend is running at ${api.baseUrl}`}
        />

        {!loading && !error && flights.length > 0 && filtered.length === 0 && (
          <StatusDisplay loading={false} error={null} empty emptyMessage={`No ${filter} flights.`} />
        )}

        {filtered.length > 0 && (
          <Grid container spacing={2}>
            {filtered.map((f) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={f.id}>
                <FlightCard
                  airline={f.airline}
                  flightNumber={f.flight_number}
                  origin={f.origin}
                  destination={f.destination}
                  departureTime={f.departure_time}
                  durationHours={f.duration_hours}
                  price={f.price}
                  type={f.type}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  )
}
