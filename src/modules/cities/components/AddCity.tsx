import React, { BaseSyntheticEvent, FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../../../store'
import { citiesSelector } from '../../../store/weatherSlice'
import { ICityProps } from '../../../types'

const AddCity: FC = () => {
  const [cities, setCities] = useState<ICityProps[]>([])
  const allCities: ICityProps[] = useSelector(citiesSelector)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    setCities(allCities)
  }, [allCities])

  const onSearch = (e: BaseSyntheticEvent) => {
    let searchedCities = cities.filter((city: ICityProps) => city.name.includes(e.target.value))
    e.target.value === '' ? setCities(allCities) : setCities(searchedCities)
  }

  return (
    <div className="w-64">
      <div className="mt-3 mb-3 border-2 py-1 px-3 flex justify-between rounde-md rounded-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-3 text-gray-400 hover:text-blue-400 transition duration-100"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          className="flex-grow outline-none text-gray-600"
          type="text"
          placeholder="Search Customer..."
          onChange={onSearch}
        />
      </div>

      <hr />

      <div className="h-64 overflow-y-scroll">
        {cities.map((city: ICityProps, index: number) => {
          return (
            <div key={city.name} className="my-2 p-2 border flex justify-between items-center">
              <p>{city.name}</p>
              {city.isSelected ? (
                <button
                  className="font-bold text-lg"
                  onClick={() =>
                    dispatch({
                      type: 'weather/removeFromSelectedCities',
                      payload: { index },
                    })
                  }
                >
                  -
                </button>
              ) : (
                <button
                  className="font-bold text-lg"
                  onClick={() =>
                    dispatch({
                      type: 'weather/addToSelectedCities',
                      payload: { index },
                    })
                  }
                >
                  +
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AddCity
