import React, { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { selectCity, selectedCitiesSelector } from '../../store/weatherSlice'
import { ISelectedCityProps } from '../../types'
import Modal from '../common/Modal/Modal'
import AddCity from './components/AddCity'
import WeatherInfoCard from './components/WeatherInfoCard'

const CitiesPage: FC = () => {
  const dispatch = useDispatch<Dispatch>()
  const selectedCities: ISelectedCityProps[] = useSelector(selectedCitiesSelector)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const toggleModal = (): void => {
    setIsModalOpen(isModalOpen => !isModalOpen)
  }

  return (
    <div className="h-full flex flex-col-reverse md:flex-row">
      <div className="w-full md:w-80 border rounded mr-4">
        <div className="flex justify-between items-center px-4 py-3">
          <h3 className="font-bold ">Cities</h3>
          <img
            className="w-6 h-6"
            src="https://img.icons8.com/material-outlined/96/000000/add.png"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
        <hr />
        <div className="px-4 py-3">
          {selectedCities.map((city: ISelectedCityProps, index: number) => {
            return (
              <div className="border p-2 my-2 rounded" key={city.name} onClick={() => dispatch(selectCity(city))}>
                <div className="font-bold">{city.name}</div>
              </div>
            )
          })}
        </div>
      </div>
      <WeatherInfoCard />
      {isModalOpen && (
        <Modal title="Add A City" open={isModalOpen} toggleModal={toggleModal}>
          <AddCity />
        </Modal>
      )}
    </div>
  )
}

export default CitiesPage
