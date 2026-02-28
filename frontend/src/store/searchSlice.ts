import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface SearchState {
  destination: string
  checkIn: string
  checkOut: string
  guests: number
}

const initialState: SearchState = {
  destination: '',
  checkIn: '',
  checkOut: '',
  guests: 1,
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setDestination: (state, action: PayloadAction<string>) => {
      state.destination = action.payload
    },
    setCheckIn: (state, action: PayloadAction<string>) => {
      state.checkIn = action.payload
    },
    setCheckOut: (state, action: PayloadAction<string>) => {
      state.checkOut = action.payload
    },
    setGuests: (state, action: PayloadAction<number | string>) => {
      const n = Number(action.payload)
      state.guests = Number.isFinite(n) && n >= 1 && n <= 10 ? n : 1
    },
  },
})

export const { setDestination, setCheckIn, setCheckOut, setGuests } = searchSlice.actions
export const selectSearch = (state: { search: SearchState }) => state.search
export default searchSlice.reducer
