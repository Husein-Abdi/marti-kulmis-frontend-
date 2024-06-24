import React, { useState } from "react";

import axios from 'axios';
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner";

const PasswordReset = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [authStatus, setAuthStatus] = useState("");



  const forgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true)


    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/passwordLink`, {
        email

      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

       const data = response.data

            if(data){
              setIsLoading(false)

                setAuthStatus("Please Check your Email")    
                toast.success("Email Sent Successfull")
            }
          setEmail("")
          setAuthStatus("")

    } catch (error) {
      if (error.response.status === 400 && error.response) {
        const data = error.response.data;
        setIsLoading(false);
        setAuthStatus(data.error)
        //consolelog(data.error)
        // window.alert(data.error);
      } else {
        setAuthStatus("Something Went Worng")
        //consolelog(error.response.data)

      }
    }
  };


  return (

    
    <>{isLoading ? (
      <LoadingSpinner />
    ) :
      <section className="flex items-center justify-center h-screen text-gray-600 bg-white body-font">
        <div className="flex flex-col p-8 mt-10 bg-white rounded-lg shadow-2xl lg:w-2/6 md:w-1/2 shadow-blue-200 md:ml-auto md:mr-auto md:mt-0">
          <form method="POST">
          

            <h3 className="my-8 text-3xl font-extrabold leading-normal tracking-tight text-gray-900 sm:text-4xl">
              Forget <span className="text-indigo-600">Password</span>
            </h3>


            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="block font-bold leading-7 tracking-wide text-gray-700 uppercase text-s"
              >
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                placeholder="Enter Your Email"
                className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>

           

            <div className="my-4">
              <p className="font-bold text-red-600 text-s">

                {authStatus}
              </p>
            </div>




            <div className="mx-auto w-fit">
              <div className="mx-auto">
                <button
                  type="submit"
                  
                  onClick={forgotPassword}
                  className="px-10 py-2 text-lg font-bold text-white bg-indigo-600 border-0 rounded shadow focus:shadow-outline focus:outline-none hover:bg-indigo-800"
                >
                  Send
                </button>
              </div>
            </div>

          </form>

        </div>
      </section>
    }
    </>
    
  )
}

export default PasswordReset