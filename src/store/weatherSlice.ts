import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { REHYDRATE } from 'redux-persist'
import { ICityProps, ISelectedCityProps, IWeatherStateProps } from '../types'
import type { RootState } from './'

// Define the initial state
const initialState: IWeatherStateProps = {
  cities: [
    {
      name: 'Delhi',
      isSelected: false,
    },
    {
      name: 'Mumbai',
      isSelected: false,
    },
    {
      name: 'Bangalore',
      isSelected: false,
    },
    {
      name: 'Hyderabad',
      isSelected: true,
    },
    {
      name: 'Ahmedabad',
      isSelected: false,
    },
    {
      name: 'Chennai',
      isSelected: false,
    },
    {
      name: 'Kolkata',
      isSelected: false,
    },
    {
      name: 'Surat',
      isSelected: false,
    },
    {
      name: 'Indore',
      isSelected: false,
    },
    {
      name: 'Lucknow',
      isSelected: false,
    },
    {
      name: 'Jaipur',
      isSelected: false,
    },
    {
      name: 'Bhopal',
      isSelected: false,
    },
  ],

  selectedCities: [
    {
      name: 'Hyderabad',
      isFavourite: true,
    },
    {
      name: 'Indore',
      isFavourite: true,
    },
  ],
  selectedCity: {
    name: 'Hyderabad',
    isFavourite: true,
  },
}

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    addToSelectedCities: (state, action: PayloadAction<any>) => {
      state.selectedCities.push({
        name: state.cities[action.payload.index].name,
        isFavourite: false,
      })
      state.cities[action.payload.index].isSelected = true
    },
    removeFromSelectedCities: (state, action: PayloadAction<any>) => {
      state.selectedCities = state.selectedCities.filter(city => city.name !== state.cities[action.payload.index].name)
      state.cities[action.payload.index].isSelected = false
    },
    addToFavouriteCities: (state, action: PayloadAction<any>) => {
      let index: number = state.selectedCities.findIndex(city => city.name === action.payload)
      state.selectedCities[index].isFavourite = true
      if (state.selectedCity.name === action.payload) state.selectedCity.isFavourite = true
    },
    removeFromFavouriteCities: (state, action: PayloadAction<any>) => {
      let index: number = state.selectedCities.findIndex(city => city.name === action.payload)
      state.selectedCities[index].isFavourite = false
      if (state.selectedCity.name === action.payload) state.selectedCity.isFavourite = false
    },
    selectCity: (state, action: PayloadAction<any>) => {
      state.selectedCity = action.payload
    },
  },

  extraReducers: builder => {
    builder.addCase(REHYDRATE, state => {
      return {
        ...state,
        cities: initialState.cities,
      }
    })
  },
})

export const {
  addToFavouriteCities,
  removeFromFavouriteCities,
  addToSelectedCities,
  removeFromSelectedCities,
  selectCity,
} = weatherSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const citiesSelector = (state: IWeatherStateProps): ICityProps[] => state.cities
export const selectedCitySelector = (state: IWeatherStateProps): ISelectedCityProps => state.selectedCity
export const selectedCitiesSelector = (state: IWeatherStateProps): ISelectedCityProps[] => state.selectedCities

export default weatherSlice.reducer
