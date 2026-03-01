import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface SearchState {
  destination: string
  minPrice: string
  maxPrice: string
  freeCancellation: boolean
  minRating: string
}

const initialState: SearchState = {
  destination: '',
  minPrice: '',
  maxPrice: '',
  freeCancellation: false,
  minRating: '',
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setDestination: (state, action: PayloadAction<string>) => {
      state.destination = action.payload
    },
    setMinPrice: (state, action: PayloadAction<string>) => {
      state.minPrice = action.payload
    },
    setMaxPrice: (state, action: PayloadAction<string>) => {
      state.maxPrice = action.payload
    },
    setFreeCancellation: (state, action: PayloadAction<boolean>) => {
      state.freeCancellation = action.payload
    },
    setMinRating: (state, action: PayloadAction<string>) => {
      state.minRating = action.payload
    },
  },
})

export const { setDestination, setMinPrice, setMaxPrice, setFreeCancellation, setMinRating } = searchSlice.actions
export const selectSearch = (state: { search: SearchState }) => state.search
export default searchSlice.reducer
