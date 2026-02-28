import { useEffect, useState } from 'react'
import api from '../services/api'
import type { Flight } from '../types'
import './Home.css'
import './Flights.css'

function formatDeparture(value: string | number | null | undefined): string {
  if (value == null) return '—'
  const str = String(value)
  if (/^\d{1,2}:\d{2}/.test(str)) return str.slice(0, 5)
  try {
    const d = new Date(str)
    if (!Number.isNaN(d.getTime())) {
      return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })
    }
  } catch { /* not a valid date */ }
  return str
}

const FILTER_ALL = 'all' as const
const FILTER_DIRECT = 'direct' as const
const FILTER_INDIRECT = 'indirect' as const

type FlightFilter = typeof FILTER_ALL | typeof FILTER_DIRECT | typeof FILTER_INDIRECT

function Flights() {
  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<FlightFilter>(FILTER_ALL)

  const filteredFlights =
    filter === FILTER_ALL
      ? flights
      : flights.filter((f) => (f.type || '').toLowerCase() === filter)

  useEffect(() => {
    let cancelled = false
    async function fetchFlights() {
      try {
        setLoading(true)
        setError(null)
        const data = await api.getFlights()
        if (!cancelled) setFlights(data)
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load flights')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchFlights()
    return () => { cancelled = true }
  }, [])

  return (
    <div className="flights-page">
      <section className="home__hero">
        <div className="home__hero-inner">
          <h1 className="home__hero-title">Find flights</h1>
          <p className="home__hero-subtitle">Compare direct and indirect flights and book at the best price.</p>
        </div>
      </section>

      <div className="home__content">
        <section className="home__section">
          <div className="flights__section-header">
            <h2 className="home__section-title">Flights</h2>
            {!loading && !error && flights.length > 0 && (
              <div className="flights__filter" role="group" aria-label="Flight type">
                <button
                  type="button"
                  className={`flights__filter-btn ${filter === FILTER_ALL ? 'flights__filter-btn--active' : ''}`}
                  onClick={() => setFilter(FILTER_ALL)}
                  aria-pressed={filter === FILTER_ALL}
                >
                  All
                </button>
                <button
                  type="button"
                  className={`flights__filter-btn ${filter === FILTER_DIRECT ? 'flights__filter-btn--active' : ''}`}
                  onClick={() => setFilter(FILTER_DIRECT)}
                  aria-pressed={filter === FILTER_DIRECT}
                >
                  Direct
                </button>
                <button
                  type="button"
                  className={`flights__filter-btn ${filter === FILTER_INDIRECT ? 'flights__filter-btn--active' : ''}`}
                  onClick={() => setFilter(FILTER_INDIRECT)}
                  aria-pressed={filter === FILTER_INDIRECT}
                >
                  Indirect
                </button>
              </div>
            )}
          </div>

          {loading && (
            <div className="flights__state">
              <div className="flights__spinner" aria-hidden />
              <p>Loading flights…</p>
            </div>
          )}

          {error && (
            <div className="flights__state flights__state--error">
              <p>Could not load flights: {error}</p>
              <p className="flights__state-hint">Check that the backend is running at {api.baseUrl}</p>
            </div>
          )}

          {!loading && !error && flights.length === 0 && (
            <div className="flights__state">
              <p>No flights found.</p>
            </div>
          )}

          {!loading && !error && flights.length > 0 && filteredFlights.length === 0 && (
            <div className="flights__state">
              <p>No {filter} flights.</p>
            </div>
          )}

          {!loading && !error && flights.length > 0 && filteredFlights.length > 0 && (
            <div className="flights__list">
              {filteredFlights.map((f) => (
                <article key={f.id} className="flights__card">
                  <div className="flights__card-header">
                    <span className="flights__airline">{f.airline}</span>
                    <span className={`flights__badge flights__badge--${(f.type || '').toLowerCase()}`}>
                      {f.type || '—'}
                    </span>
                  </div>
                  <p className="flights__flight-number">{f.flight_number}</p>
                  <div className="flights__route">
                    <span className="flights__city">{f.origin}</span>
                    <span className="flights__arrow" aria-hidden>→</span>
                    <span className="flights__city">{f.destination}</span>
                  </div>
                  <div className="flights__meta">
                    <span className="flights__departure">
                      Departs {formatDeparture(f.departure_time)}
                    </span>
                    {f.duration_hours != null && (
                      <span className="flights__duration">
                        {Number(f.duration_hours) === parseInt(String(f.duration_hours), 10)
                          ? `${f.duration_hours}h`
                          : `${Number(f.duration_hours).toFixed(1)}h`}
                      </span>
                    )}
                  </div>
                  <p className="flights__price">
                    {f.price != null ? (
                      <>
                        <strong>${Number(f.price).toFixed(0)}</strong>
                      </>
                    ) : (
                      'Price on request'
                    )}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Flights
