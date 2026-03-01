import { Card, CardContent, Typography, Chip, Stack, Box } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

interface FlightCardProps {
  airline: string
  flightNumber: string
  origin: string
  destination: string
  departureTime?: string
  durationHours?: number
  price?: number
  type?: string
}

function formatDeparture(value: string | number | null | undefined): string {
  if (value == null) return '—'
  const str = String(value)
  if (/^\d{1,2}:\d{2}/.test(str)) return str.slice(0, 5)
  try {
    const d = new Date(str)
    if (!Number.isNaN(d.getTime()))
      return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })
  } catch { /* not a valid date */ }
  return str
}

function badgeColor(type?: string): 'success' | 'warning' | 'default' {
  if (type?.toLowerCase() === 'direct') return 'success'
  if (type?.toLowerCase() === 'indirect') return 'warning'
  return 'default'
}

export default function FlightCard({
  airline,
  flightNumber,
  origin,
  destination,
  departureTime,
  durationHours,
  price,
  type,
}: FlightCardProps) {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.5}>
          <Typography fontWeight={600}>{airline}</Typography>
          <Chip label={type || '—'} size="small" color={badgeColor(type)} />
        </Stack>

        <Typography variant="body2" color="text.secondary" mb={1}>
          {flightNumber}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
          <Typography fontWeight={500}>{origin}</Typography>
          <ArrowForwardIcon fontSize="small" color="primary" />
          <Typography fontWeight={500}>{destination}</Typography>
        </Stack>

        <Stack direction="row" spacing={2} mb={1}>
          <Typography variant="body2" color="text.secondary">
            Departs {formatDeparture(departureTime)}
          </Typography>
          {durationHours != null && (
            <Typography variant="body2" color="text.secondary">
              {Number(durationHours) === parseInt(String(durationHours), 10)
                ? `${durationHours}h`
                : `${Number(durationHours).toFixed(1)}h`}
            </Typography>
          )}
        </Stack>

        <Box>
          <Typography variant="h6" color="primary" component="span">
            {price != null ? `$${Number(price).toFixed(0)}` : 'Price on request'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}
