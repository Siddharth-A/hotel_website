import { Box, CircularProgress, Alert, Typography } from '@mui/material'

interface StatusDisplayProps {
  loading: boolean
  error: string | null
  empty: boolean
  emptyMessage?: string
  hint?: string
}

export default function StatusDisplay({
  loading,
  error,
  empty,
  emptyMessage = 'No results found.',
  hint,
}: StatusDisplayProps) {
  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <CircularProgress color="primary" />
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          Loading…
        </Typography>
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        {error}
        {hint && (
          <Typography variant="body2" sx={{ mt: 0.5, opacity: 0.9 }}>
            {hint}
          </Typography>
        )}
      </Alert>
    )
  }

  if (empty) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Typography color="text.secondary">{emptyMessage}</Typography>
      </Box>
    )
  }

  return null
}
