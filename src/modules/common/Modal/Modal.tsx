import React, { FC, useEffect } from 'react'
import { createPortal } from 'react-dom'

const Portal = ({ children }: { children: React.ReactNode }) => {
  const modalRoot = document.getElementById('modal')
  const el = document.createElement('div')

  useEffect((): any => {
    modalRoot!.appendChild(el)
    return () => modalRoot!.removeChild(el)
  }, [])

  return createPortal(children, el)
}

interface Props {
  children: React.ReactNode
  open: boolean
  title: string
  toggleModal: () => void
}

const Modal: FC<Props> = ({ children, open, title, toggleModal }) => (
  <Portal>
    {open && (
      <div className="h-screen w-screen bg-black bg-opacity-25 fixed top-0 left-0 flex justify-center items-center z-0">
        <div className="min-w-min min-h-min bg-white p-4 rounded z-10">
          <div className="flex justify-between items-center">
            <h3 className="font-bold">Add a city</h3>
            <img
              src="https://img.icons8.com/plumpy/96/000000/macos-close.png"
              className="w-5 h-5 cursor-pointer"
              onClick={toggleModal}
            />
          </div>

          <hr className="my-2" />
          {children}
        </div>
      </div>
    )}
  </Portal>
)

export default Modal
