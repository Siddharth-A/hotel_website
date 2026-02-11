import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  destination: '',
  checkIn: '',
  checkOut: '',
  guests: 1,
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setDestination: (state, action) => {
      state.destination = action.payload
    },
    setCheckIn: (state, action) => {
      state.checkIn = action.payload
    },
    setCheckOut: (state, action) => {
      state.checkOut = action.payload
    },
    setGuests: (state, action) => {
      const n = Number(action.payload)
      state.guests = Number.isFinite(n) && n >= 1 && n <= 10 ? n : 1
    },
  },
})

export const { setDestination, setCheckIn, setCheckOut, setGuests } = searchSlice.actions
export const selectSearch = (state) => state.search
export default searchSlice.reducer
