import type { FormEvent } from 'react'
import { Container, Typography, TextField, Button, Stack, Paper } from '@mui/material'
import HeroSection from '../components/HeroSection'

export default function Contact() {
  return (
    <>
      <HeroSection
        title="Contact us"
        subtitle="Have a question or need help? We'd love to hear from you."
      />

      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Stack
            component="form"
            spacing={2}
            onSubmit={(e: FormEvent) => {
              e.preventDefault()
            }}
          >
            <TextField label="Name" required fullWidth />
            <TextField label="Email" type="email" required fullWidth />
            <TextField label="Subject" fullWidth />
            <TextField label="Message" required multiline rows={4} fullWidth />
            <Button type="submit" variant="contained" size="large">
              Send message
            </Button>
          </Stack>
        </Paper>

        <Stack spacing={1} sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body1" fontWeight={600}>
            Hotel.com Support
          </Typography>
          <Typography variant="body2" color="text.secondary">
            support@hotel.com
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Available 24/7
          </Typography>
        </Stack>
      </Container>
    </>
  )
}
