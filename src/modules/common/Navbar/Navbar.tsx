import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar: FC = () => {
  const [activeLink, setActiveLink] = useState<string>('/')
  const menuLinks = [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'Cities',
      path: '/cities',
    },
  ]

  return (
    <nav className="h-15 md:h-screen w-full md:w-48 p-4 bg-blue-50 md:pt-8">
      <ul className="flex flex-row md:flex-col gap-2">
        {menuLinks.map(menuItem =>
          activeLink === menuItem.path ? (
            <li className="font-bold" key={menuItem.title}>
              <Link to={menuItem.path}>{menuItem.title}</Link>
            </li>
          ) : (
            <li key={menuItem.title} onClick={() => setActiveLink(menuItem.path)}>
              <Link to={menuItem.path}>{menuItem.title}</Link>
            </li>
          ),
        )}
      </ul>
    </nav>
  )
}

export default Navbar
