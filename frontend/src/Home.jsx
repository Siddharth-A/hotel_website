import { useDispatch, useSelector } from 'react-redux'
import { selectSearch, setDestination, setCheckIn, setCheckOut, setGuests } from './store/searchSlice'
import './Home.css'

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
  { icon: '✓', title: 'Best Price Guarantee', text: 'Find a lower rate and we’ll match it.' },
  { icon: '★', title: 'Verified Reviews', text: 'Real stays from real guests.' },
  { icon: '💳', title: 'Free Cancellation', text: 'Most stays can be cancelled for free.' },
  { icon: '💬', title: '24/7 Support', text: 'We’re here whenever you need us.' },
]

function Home() {
  const { destination, checkIn, checkOut, guests } = useSelector(selectSearch)
  const dispatch = useDispatch()

  const handleSearch = (e) => {
    e.preventDefault()
    console.log({ destination, checkIn, checkOut, guests })
    // TODO: navigate to search results or call API
  }

  return (
    <div className="home">
      {/* Hero + Search */}
      <section className="home__hero">
        <div className="home__hero-inner">
          <h1 className="home__hero-title">Find your perfect stay</h1>
          <p className="home__hero-subtitle">Compare hotels, read reviews, and book at the best price.</p>
          <form className="home__search" onSubmit={handleSearch}>
            <div className="home__search-field">
              <label htmlFor="destination" className="home__search-label">Destination</label>
              <input
                id="destination"
                type="text"
                placeholder="City, region, or hotel"
                value={destination}
                onChange={(e) => dispatch(setDestination(e.target.value))}
                className="home__search-input"
              />
            </div>
            <div className="home__search-field">
              <label htmlFor="check-in" className="home__search-label">Check-in</label>
              <input
                id="check-in"
                type="date"
                value={checkIn}
                onChange={(e) => dispatch(setCheckIn(e.target.value))}
                className="home__search-input"
              />
            </div>
            <div className="home__search-field">
              <label htmlFor="check-out" className="home__search-label">Check-out</label>
              <input
                id="check-out"
                type="date"
                value={checkOut}
                onChange={(e) => dispatch(setCheckOut(e.target.value))}
                className="home__search-input"
              />
            </div>
            <div className="home__search-field">
              <label htmlFor="guests" className="home__search-label">Guests</label>
              <input
                id="guests"
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
        {/* Popular destinations */}
        <section className="home__section">
          <h2 className="home__section-title">Popular destinations</h2>
          <div className="home__destinations">
            {POPULAR_DESTINATIONS.map((d) => (
              <a key={d.id} href={`/hotels?destination=${encodeURIComponent(d.name)}`} className="home__destination-card">
                <img src={d.image} alt={d.name} className="home__destination-img" />
                <div className="home__destination-overlay">
                  <span className="home__destination-name">{d.name}</span>
                  <span className="home__destination-country">{d.country}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Featured hotels */}
        <section className="home__section">
          <h2 className="home__section-title">Featured hotels</h2>
          <div className="home__hotels">
            {FEATURED_HOTELS.map((h) => (
              <article key={h.id} className="home__hotel-card">
                <div className="home__hotel-image-wrap">
                  <img src={h.image} alt={h.name} className="home__hotel-img" />
                  <span className="home__hotel-rating">{h.rating}</span>
                </div>
                <div className="home__hotel-body">
                  <h3 className="home__hotel-name">{h.name}</h3>
                  <p className="home__hotel-location">{h.location}</p>
                  <p className="home__hotel-reviews">{h.reviews.toLocaleString()} reviews</p>
                  <p className="home__hotel-price">
                    <strong>${h.price}</strong>
                    <span className="home__hotel-price-night"> / night</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Why book with us */}
        <section className="home__section home__section--muted">
          <h2 className="home__section-title">Why book with us</h2>
          <div className="home__why">
            {WHY_US.map((item, i) => (
              <div key={i} className="home__why-item">
                <span className="home__why-icon">{item.icon}</span>
                <h3 className="home__why-title">{item.title}</h3>
                <p className="home__why-text">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="home__cta">
          <h2 className="home__cta-title">Save 10% on your next stay</h2>
          <p className="home__cta-text">Sign up for our newsletter and get exclusive deals.</p>
          <form className="home__cta-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" className="home__cta-input" />
            <button type="submit" className="home__cta-btn">Subscribe</button>
          </form>
        </section>
      </div>
    </div>
  )
}

export default Home
