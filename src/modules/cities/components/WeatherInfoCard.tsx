import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'

import { getWeatherInfoByCity } from '../../../apis/api'
import { addToFavouriteCities, removeFromFavouriteCities, selectedCitySelector } from '../../../store/weatherSlice'
import { ISelectedCityProps, IWeatherInfoProps } from '../../../types'

const WeatherInfoCard: FC = () => {
  const dispatch = useDispatch<Dispatch>()
  const selectedCity: ISelectedCityProps = useSelector(selectedCitySelector)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [weatherInfo, setWeatherInfo] = useState<IWeatherInfoProps | null>(null)

  useEffect(() => {
    setIsLoading(true)
    getWeatherInfoByCity(selectedCity.name).then(data => {
      setWeatherInfo(data)
      setIsLoading(false)
    })
  }, [selectedCity.name])

  return (
    <div className="w-full border rounded">
      <div className="flex justify-between items-center px-4 py-2">
        <h3 className="font-bold">{selectedCity.name}</h3>
        <div>
          {selectedCity.isFavourite ? (
            <img
              className="w-8"
              src="https://img.icons8.com/fluency/96/000000/star.png"
              onClick={() => dispatch(removeFromFavouriteCities(selectedCity.name))}
            />
          ) : (
            <img
              className="w-8"
              src="https://img.icons8.com/color/96/000000/star--v1.png"
              onClick={() => dispatch(addToFavouriteCities(selectedCity.name))}
            />
          )}
        </div>
      </div>
      <hr />
      {isLoading ? (
        <div className="w-full mt-8 md:mt-52 text-center">
          <div className="animate-pulse flex space-x-4 mx-8">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-8 md:mt-48">
          <div className="text-xl font-bold">
            Temperature : {(weatherInfo && weatherInfo?.main.temp - 273.15)?.toFixed(2)} °C
          </div>
          <div className="text-xl font-bold">Humidity : {weatherInfo?.main.humidity}</div>
          <div className="text-xl font-bold">Pressure : {weatherInfo?.main.pressure}</div>
        </div>
      )}
    </div>
  )
}

export default WeatherInfoCard
