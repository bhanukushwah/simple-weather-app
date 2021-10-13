import React, { FC } from 'react'
import Navbar from '../Navbar/Navbar'

interface Props {
  children: React.ReactNode
}

const Layout: FC<Props> = props => {
  const { children } = props
  return (
    <div className="flex flex-col md:flex-row">
      <Navbar />
      <div className="w-full p-4 md:p-8">{children}</div>
    </div>
  )
}

export default Layout
