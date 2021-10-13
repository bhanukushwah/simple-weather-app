import React, { FC, useState } from 'react'

import AddCity from '../cities/components/AddCity'
import Modal from '../common/Modal/Modal'
import FavouriteCities from './components/FavouriteCities'

const HomePage: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const toggleModal = (): void => {
    setIsModalOpen(isModalOpen => !isModalOpen)
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl">My Favourite Cities</h1>
        <button className="px-3 py-1 rounded bg-blue-500 text-white" onClick={toggleModal}>
          Add new City
        </button>

        {isModalOpen && (
          <Modal title="Add A City" open={isModalOpen} toggleModal={toggleModal}>
            <AddCity />
          </Modal>
        )}
      </div>
      <FavouriteCities />
    </div>
  )
}

export default HomePage
