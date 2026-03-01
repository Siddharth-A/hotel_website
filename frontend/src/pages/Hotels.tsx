import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Container, Typography, Grid, Pagination, Box } from '@mui/material'
import HeroSection from '../components/HeroSection'
import SearchForm from '../components/SearchForm'
import HotelCard from '../components/HotelCard'
import StatusDisplay from '../components/StatusDisplay'
import { useFetch } from '../hooks/useFetch'
import { useAppDispatch, useAppSelector } from '../store'
import { selectSearch, setDestination } from '../store/searchSlice'
import api from '../services/api'
import type { SearchHotelsParams } from '../services/api'
import type { Hotel, PaginatedResponse } from '../types'

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=260&fit=crop'

function buildParams(search: ReturnType<typeof selectSearch>): SearchHotelsParams {
  return {
    destination: search.destination || undefined,
    minPrice: search.minPrice ? Number(search.minPrice) : undefined,
    maxPrice: search.maxPrice ? Number(search.maxPrice) : undefined,
    minRating: search.minRating ? Number(search.minRating) : undefined,
    freeCancellation: search.freeCancellation || undefined,
  }
}

export default function Hotels() {
  const dispatch = useAppDispatch()
  const search = useAppSelector(selectSearch)
  const [searchParams] = useSearchParams()

  const [committedParams, setCommittedParams] = useState<SearchHotelsParams>(() => {
    const urlDest = searchParams.get('destination') ?? ''
    const dest = urlDest || search.destination
    return dest ? { destination: dest } : {}
  })

  const [page, setPage] = useState(1)
  const isFiltering = Object.values(committedParams).some(Boolean)
  const initialised = useRef(false)

  useEffect(() => {
    if (initialised.current) return
    initialised.current = true
    const urlDest = searchParams.get('destination')
    if (urlDest) {
      dispatch(setDestination(urlDest))
      setCommittedParams({ destination: urlDest })
    }
  }, [searchParams, dispatch])

  const fetchHotels = useCallback(
    () =>
      isFiltering
        ? api.searchHotels({ ...committedParams, page })
        : api.getHotels(page),
    [committedParams, isFiltering, page],
  )
  const { data: result, loading, error } = useFetch<PaginatedResponse<Hotel>>(fetchHotels)
  const hotels = result?.data ?? []
  const totalPages = result?.pages ?? 0

  const handleSearch = () => {
    setPage(1)
    setCommittedParams(buildParams(search))
  }

  return (
    <>
      <HeroSection title="Find your perfect stay" subtitle="Compare hotels, read reviews, and book at the best price.">
        <SearchForm onSubmit={handleSearch} />
      </HeroSection>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          {isFiltering ? 'Search results' : 'All hotels'}
          {result && result.total > 0 && (
            <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({result.total} found)
            </Typography>
          )}
        </Typography>

        <StatusDisplay
          loading={loading}
          error={error}
          empty={!loading && !error && hotels.length === 0}
          emptyMessage={isFiltering ? 'No hotels match your filters.' : 'No hotels found.'}
          hint={`Check that the backend is running at ${api.baseUrl}`}
        />

        {!loading && !error && hotels.length > 0 && (
          <>
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

            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(_, p) => {
                    setPage(p)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  color="primary"
                  size="large"
                />
              </Box>
            )}
          </>
        )}
      </Container>
    </>
  )
}
