import type { FormEvent } from 'react'
import { Paper, TextField, Button, Stack, FormControlLabel, Checkbox } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useAppDispatch, useAppSelector } from '../store'
import {
  selectSearch,
  setDestination,
  setMinPrice,
  setMaxPrice,
  setFreeCancellation,
  setMinRating,
} from '../store/searchSlice'

interface SearchFormProps {
  onSubmit?: () => void
}

export default function SearchForm({ onSubmit }: SearchFormProps) {
  const { destination, minPrice, maxPrice, freeCancellation, minRating } = useAppSelector(selectSearch)
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
        label="Min Price"
        type="number"
        size="small"
        slotProps={{ htmlInput: { min: 0 } }}
        value={minPrice}
        onChange={(e) => dispatch(setMinPrice(e.target.value))}
        sx={{ width: 110 }}
      />
      <TextField
        label="Max Price"
        type="number"
        size="small"
        slotProps={{ htmlInput: { min: 0 } }}
        value={maxPrice}
        onChange={(e) => dispatch(setMaxPrice(e.target.value))}
        sx={{ width: 110 }}
      />
      <TextField
        label="Min Rating"
        type="number"
        size="small"
        slotProps={{ htmlInput: { min: 0, max: 5, step: 0.1 } }}
        value={minRating}
        onChange={(e) => dispatch(setMinRating(e.target.value))}
        sx={{ width: 110 }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={freeCancellation}
            onChange={(e) => dispatch(setFreeCancellation(e.target.checked))}
            size="small"
          />
        }
        label="Free cancellation"
        sx={{ mr: 0 }}
      />
      <Stack>
        <Button type="submit" variant="contained" startIcon={<SearchIcon />}>
          Search
        </Button>
      </Stack>
    </Paper>
  )
}
