import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'

import { getWeatherInfoByCity } from '../../../apis/api'
import { addToFavouriteCities, removeFromFavouriteCities } from '../../../store/weatherSlice'
import { ISelectedCityProps, IWeatherInfoProps } from '../../../types'

const Card = ({ city }: { city: ISelectedCityProps }) => {
  const dispatch = useDispatch<Dispatch>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [weatherInfo, setWeatherInfo] = useState<IWeatherInfoProps>()

  useEffect(() => {
    setIsLoading(true)
    getWeatherInfoByCity(city.name)
      .then((data: IWeatherInfoProps) => {
        setWeatherInfo(data)
        setIsLoading(false)
      })
      .catch(error => console.log('Error', JSON.stringify(error)))
  }, [])

  return (
    <div className="border border-grey-300 shadow rounded-md p-4 w-full mx-auto">
      <div className="flex justify-between items-center">
        <div className="font-bold text-lg">{city.name}</div>
        <div>
          {city.isFavourite ? (
            <img
              className="w-8"
              src="https://img.icons8.com/fluency/96/000000/star.png"
              onClick={() => dispatch(removeFromFavouriteCities(city.name))}
            />
          ) : (
            <img
              className="w-8"
              src="https://img.icons8.com/color/96/000000/star--v1.png"
              onClick={() => dispatch(addToFavouriteCities(city.name))}
            />
          )}
        </div>
      </div>
      {isLoading ? (
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-5">
          <div className="text-md font-bold">
            Temperature : {(weatherInfo && weatherInfo?.main.temp - 273.15)?.toFixed(2)} °C
          </div>
          <div className="text-md font-bold">Humidity : {weatherInfo?.main.humidity}</div>
          <div className="text-md font-bold">Pressure : {weatherInfo?.main.pressure}</div>
        </div>
      )}
    </div>
  )
}

export default Card
