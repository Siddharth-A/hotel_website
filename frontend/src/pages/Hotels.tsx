import { useEffect, useState } from 'react'
import { selectSearch, setDestination, setCheckIn, setCheckOut, setGuests } from '../store/searchSlice'
import { useAppDispatch, useAppSelector } from '../store'
import api from '../services/api'
import type { Hotel } from '../types'
import './Home.css'
import './Hotels.css'

function Hotels() {
  const { destination, checkIn, checkOut, guests } = useAppSelector(selectSearch)
  const dispatch = useAppDispatch()
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function fetchHotels() {
      try {
        setLoading(true)
        setError(null)
        const data = await api.getHotels()
        if (!cancelled) setHotels(data)
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load hotels')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchHotels()
    return () => { cancelled = true }
  }, [])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div className="hotels-page">
      {/* Hero + Search (same as Home) */}
      <section className="home__hero">
        <div className="home__hero-inner">
          <h1 className="home__hero-title">Find your perfect stay</h1>
          <p className="home__hero-subtitle">Compare hotels, read reviews, and book at the best price.</p>
          <form className="home__search" onSubmit={handleSearch}>
            <div className="home__search-field">
              <label htmlFor="hotels-destination" className="home__search-label">Destination</label>
              <input
                id="hotels-destination"
                type="text"
                placeholder="City, region, or hotel"
                value={destination}
                onChange={(e) => dispatch(setDestination(e.target.value))}
                className="home__search-input"
              />
            </div>
            <div className="home__search-field">
              <label htmlFor="hotels-check-in" className="home__search-label">Check-in</label>
              <input
                id="hotels-check-in"
                type="date"
                value={checkIn}
                onChange={(e) => dispatch(setCheckIn(e.target.value))}
                className="home__search-input"
              />
            </div>
            <div className="home__search-field">
              <label htmlFor="hotels-check-out" className="home__search-label">Check-out</label>
              <input
                id="hotels-check-out"
                type="date"
                value={checkOut}
                onChange={(e) => dispatch(setCheckOut(e.target.value))}
                className="home__search-input"
              />
            </div>
            <div className="home__search-field">
              <label htmlFor="hotels-guests" className="home__search-label">Guests</label>
              <input
                id="hotels-guests"
                type="number"
                min={1}
                max={10}
                value={guests}
                onChange={(e) => dispatch(setGuests(e.target.value))}
                className="home__search-input"
              />
            </div>
            <button type="submit" className="home__search-btn">Search</button>
          </form>
        </div>
      </section>

      <div className="home__content">
        <section className="home__section">
          <h2 className="home__section-title">All hotels</h2>

          {loading && (
            <div className="hotels__state">
              <div className="hotels__spinner" aria-hidden />
              <p>Loading hotels…</p>
            </div>
          )}

          {error && (
            <div className="hotels__state hotels__state--error">
              <p>Could not load hotels: {error}</p>
              <p className="hotels__state-hint">Check that the backend is running at {api.baseUrl}</p>
            </div>
          )}

          {!loading && !error && hotels.length === 0 && (
            <div className="hotels__state">
              <p>No hotels found.</p>
            </div>
          )}

          {!loading && !error && hotels.length > 0 && (
            <div className="home__hotels">
              {hotels.map((h) => (
                <article key={h.id} className="home__hotel-card">
                  <div className="home__hotel-image-wrap">
                    <img
                      src={h.image_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=260&fit=crop'}
                      alt={h.name}
                      className="home__hotel-img"
                    />
                    {h.rating != null && (
                      <span className="home__hotel-rating">{Number(h.rating).toFixed(1)}</span>
                    )}
                    {h.star_rating != null && (
                      <span className="hotels__stars">{'★'.repeat(h.star_rating)}</span>
                    )}
                  </div>
                  <div className="home__hotel-body">
                    <h3 className="home__hotel-name">{h.name}</h3>
                    <p className="home__hotel-location">
                      {[h.city, h.country].filter(Boolean).join(', ') || '—'}
                    </p>
                    {h.review_count != null && (
                      <p className="home__hotel-reviews">
                        {Number(h.review_count).toLocaleString()} reviews
                      </p>
                    )}
                    {h.description && (
                      <p className="hotels__description">{h.description}</p>
                    )}
                    {h.amenities && h.amenities.length > 0 && (
                      <p className="hotels__amenities">
                        {h.amenities.slice(0, 3).join(' • ')}
                      </p>
                    )}
                    <p className="home__hotel-price">
                      {h.price_per_night != null ? (
                        <>
                          <strong>${Number(h.price_per_night).toFixed(0)}</strong>
                          <span className="home__hotel-price-night"> / night</span>
                        </>
                      ) : (
                        <span className="home__hotel-price-night">Price on request</span>
                      )}
                    </p>
                    {h.free_cancellation && (
                      <span className="hotels__badge">Free cancellation</span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Hotels
