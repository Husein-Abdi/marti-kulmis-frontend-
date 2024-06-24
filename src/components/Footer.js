import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
const Footer = () => {
  return (
    <>
    <footer className="mt-5 text-gray-600 body-font ">
  <div className="container flex flex-col items-center px-5 py-8 mx-auto sm:flex-row ">
    <Link to={"/"} className="flex items-center justify-center font-medium text-gray-900 title-font md:justify-start">
    <div aria-label="Home. logo" className="flex items-center justify-between" role="img">
          
          <img className="w-24 md:w-64" src={logo} alt="logo" />
          
         </div>
         
    </Link>
     <p className="mt-4 text-sm text-gray-500 hover:text-gray-700 focus:text-gray-700 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0">© 2024 Marti-kulmis Hall Booking System — Made with &#10084;&#65039; by Students Of jamhuriya university
     </p> 

  </div>
</footer>
    </>
  )
}

export default Footer
