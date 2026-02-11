import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './themeSlice'
import searchReducer from './searchSlice'

export function makeStore() {
  return configureStore({
    reducer: {
      theme: themeReducer,
      search: searchReducer,
    },
  })
}

export const store = makeStore()
