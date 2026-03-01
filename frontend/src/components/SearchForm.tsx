import type { FormEvent } from 'react'
import { Paper, TextField, Button, Stack } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useAppDispatch, useAppSelector } from '../store'
import { selectSearch, setDestination, setCheckIn, setCheckOut, setGuests } from '../store/searchSlice'

interface SearchFormProps {
  onSubmit?: () => void
}

export default function SearchForm({ onSubmit }: SearchFormProps) {
  const { destination, checkIn, checkOut, guests } = useAppSelector(selectSearch)
  const dispatch = useAppDispatch()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit?.()
  }

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={3}
      sx={{ p: 2, display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'flex-end' }}
    >
      <TextField
        label="Destination"
        placeholder="City, region, or hotel"
        size="small"
        value={destination}
        onChange={(e) => dispatch(setDestination(e.target.value))}
        sx={{ flex: 1, minWidth: 160 }}
      />
      <TextField
        label="Check-in"
        type="date"
        size="small"
        slotProps={{ inputLabel: { shrink: true } }}
        value={checkIn}
        onChange={(e) => dispatch(setCheckIn(e.target.value))}
        sx={{ flex: 1, minWidth: 140 }}
      />
      <TextField
        label="Check-out"
        type="date"
        size="small"
        slotProps={{ inputLabel: { shrink: true } }}
        value={checkOut}
        onChange={(e) => dispatch(setCheckOut(e.target.value))}
        sx={{ flex: 1, minWidth: 140 }}
      />
      <TextField
        label="Guests"
        type="number"
        size="small"
        slotProps={{ htmlInput: { min: 1, max: 10 } }}
        value={guests}
        onChange={(e) => dispatch(setGuests(e.target.value))}
        sx={{ width: 90 }}
      />
      <Stack>
        <Button type="submit" variant="contained" startIcon={<SearchIcon />}>
          Search
        </Button>
      </Stack>
    </Paper>
  )
}
