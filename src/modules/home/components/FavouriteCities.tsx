import React from 'react'
import { useSelector } from 'react-redux'

import { selectedCitiesSelector } from '../../../store/weatherSlice'
import { ISelectedCityProps } from '../../../types'
import Card from './Card'

const FavouriteCities = () => {
  const selectedCities: ISelectedCityProps[] = useSelector(selectedCitiesSelector)

  return (
    <div className="mt-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {selectedCities.map((city: ISelectedCityProps) => city.isFavourite && <Card key={city.name} city={city} />)}
    </div>
  )
}

export default FavouriteCities
