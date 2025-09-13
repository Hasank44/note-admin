import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { FaUser } from 'react-icons/fa'
import { MessageContext } from '../../context/MessageProvider'
const Navbar = () => {
  const { ToastContainer } = useContext(MessageContext);
const location = useLocation();
const [ active, setActive ] = useState('')
useEffect(()=>{
  setActive(location.pathname || '/')
}, [location.pathname])

const handleActiveLink = (path) =>{
  setActive(path)
}

  const NavLinks = [
    { link:'/', label:'Dashboard'}
  ]
  return (
    <nav className='w-full h-auto bg-gray-200 items-center font-sans font-bold sticky top-0 z-10'>
      <ToastContainer />
      <div className='w-full h-12 container mx-auto items-center flex justify-between px-5 sm:px-0'>
          <div className='items-center'>
              <h1 className='text-amber-600'>Notes</h1>
          </div>
          <ul className='flex gap-3'>
            {
              NavLinks.map( link =>(
                <li key={link.link}>
                  <Link
                  onClick={ ()=> handleActiveLink(`${link.link}`)}
                  className={`${ active === `${link.link}`? 'text-amber-600'
                  :
                  'hover:text-amber-600 text-gray-900 '} `}
                   to={link.link}>{link.label}</Link>
                </li>
              ))
            }
          </ul>
            <FaUser className='text-2xl hover:text-amber-500 cursor-pointer' />
      </div>
    </nav>
  )
}

export default Navbar