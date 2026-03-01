import type { ReactNode } from 'react'
import { Box, Typography, Container } from '@mui/material'

interface HeroSectionProps {
  title: string
  subtitle: string
  children?: ReactNode
}

export default function HeroSection({ title, subtitle, children }: HeroSectionProps) {
  return (
    <Box
      sx={{
        background: (t) =>
          `linear-gradient(135deg, ${t.palette.background.paper} 0%, ${t.palette.background.default} 50%)`,
        borderBottom: 1,
        borderColor: 'divider',
        py: { xs: 4, md: 6 },
        px: 2,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h3" fontWeight={700} gutterBottom>
          {title}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: children ? 3 : 0 }}>
          {subtitle}
        </Typography>
        {children}
      </Container>
    </Box>
  )
}
