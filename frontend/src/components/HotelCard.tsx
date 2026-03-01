import { Card, CardMedia, CardContent, Typography, Chip, Box } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'

interface HotelCardProps {
  name: string
  location: string
  image: string
  price?: number
  rating?: number
  starRating?: number
  reviews?: number
  description?: string
  amenities?: string[]
  freeCancellation?: boolean
}

export default function HotelCard({
  name,
  location,
  image,
  price,
  rating,
  starRating,
  reviews,
  description,
  amenities,
  freeCancellation,
}: HotelCardProps) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia component="img" height={180} image={image} alt={name} />
        {rating != null && (
          <Chip
            icon={<StarIcon sx={{ fontSize: 16 }} />}
            label={Number(rating).toFixed(1)}
            size="small"
            color="primary"
            sx={{ position: 'absolute', top: 8, right: 8 }}
          />
        )}
        {starRating != null && (
          <Typography
            sx={{ position: 'absolute', bottom: 8, left: 8, color: '#f59e0b', fontSize: 14 }}
          >
            {'★'.repeat(starRating)}
          </Typography>
        )}
      </Box>

      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="subtitle1" fontWeight={600}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {location}
        </Typography>
        {reviews != null && (
          <Typography variant="body2" color="text.secondary">
            {reviews.toLocaleString()} reviews
          </Typography>
        )}
        {description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {description}
          </Typography>
        )}
        {amenities && amenities.length > 0 && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
            {amenities.slice(0, 3).join(' · ')}
          </Typography>
        )}

        <Box sx={{ mt: 'auto', pt: 1 }}>
          <Typography variant="h6" color="primary" component="span">
            {price != null ? `$${Number(price).toFixed(0)}` : 'Price on request'}
          </Typography>
          {price != null && (
            <Typography variant="body2" color="text.secondary" component="span">
              {' / night'}
            </Typography>
          )}
        </Box>

        {freeCancellation && (
          <Chip label="Free cancellation" color="primary" size="small" variant="outlined" sx={{ mt: 1, alignSelf: 'flex-start' }} />
        )}
      </CardContent>
    </Card>
  )
}
