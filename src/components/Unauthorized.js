import React from 'react'
import { Link } from "react-router-dom"
import unauthorized from '../assets/unauthorized.png'
const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-16 px-6 lg:flex-row md:px-24 lg:gap-28">
            <div className="w-full lg:w-1/2">
              <img alt='error' className="hidden lg:block"  src={unauthorized} />
              
            </div>
            <div className="w-full lg:w-1/2">
              <h1 className="py-4 text-3xl font-extrabold text-gray-800 lg:text-4xl ">Looks Like You Are Not Authorized For This Page!</h1>
              <p className="py-4 text-xl text-gray-800">Please click on the below button to login.</p>
              <div>
    
                <Link to="/login" ><button
                  className="w-full px-1 py-5 my-4 text-white bg-indigo-600 rounded-md lg:w-auto sm:px-16 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">Login
                </button>
                </Link>
              </div>
            </div>
          </div>  )
}

export default Unauthorized