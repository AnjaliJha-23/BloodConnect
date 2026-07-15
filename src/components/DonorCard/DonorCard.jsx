import { FaStar, FaQuoteRight } from 'react-icons/fa'
import './DonorCard.css'

/**
 * Reusable card used to display a person + short message.
 * Used by Testimonials on the Home page and Team section on About page.
 */
const DonorCard = ({ name, location, message, rating = 5, avatarColor = '#E63946' }) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)

  return (
    <div className="donor-card">
      <FaQuoteRight className="donor-card-quote-icon" />
      <div className="donor-card-header">
        <div className="donor-avatar" style={{ backgroundColor: avatarColor }}>
          {initials}
        </div>
        <div>
          <h4 className="donor-name">{name}</h4>
          {location && <p className="donor-location">{location}</p>}
        </div>
      </div>

      <div className="donor-rating">
        {Array.from({ length: 5 }).map((_, i) => (
          <FaStar key={i} className={i < rating ? 'star-filled' : 'star-empty'} />
        ))}
      </div>

      <p className="donor-message">{message}</p>
    </div>
  )
}

export default DonorCard
