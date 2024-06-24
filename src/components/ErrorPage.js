import React from 'react'
import { Link } from "react-router-dom"
import notFound from '../assets/notFound.png'
const ErrorPage = () => {
  return (
    <>





      <div className="flex flex-col items-center justify-center gap-16 px-6 lg:flex-row py-28 md:px-24 md:py-20 lg:py-32 lg:gap-28">
        <div className="w-full lg:w-1/2">
          <img alt='error' className="hidden lg:block" src={notFound} />
          <img alt='error' className="hidden md:block lg:hidden" src={notFound} />
          <img alt='error' className="md:hidden" src={notFound} />
        </div>
        <div className="w-full lg:w-1/2">
          <h1 className="py-4 text-3xl font-extrabold text-gray-800 lg:text-4xl ">Looks like you've found the doorway to the great nothing</h1>
          <p className="py-4 text-base text-gray-800">The content you’re looking for doesn’t exist. Either it was removed, or you mistyped the link.</p>
          <p className="py-2 text-base text-gray-800">Sorry about that! Please visit our homepage to get where you need to go.</p>
          <div>

            <Link to="/" ><button
              className="w-full px-1 py-5 my-4 text-white bg-indigo-600 rounded-md lg:w-auto sm:px-16 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">Go back to Homepage
            </button>
            </Link>
          </div>
        </div>
      </div>



    </>
  )
}

export default ErrorPage