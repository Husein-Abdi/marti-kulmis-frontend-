import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from 'axios';
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import verifail from '../../assets/verification fail.png';
import verisuccess from '../../assets/verification success.jpg';
import LoadingSpinner from "../LoadingSpinner";
const VerifySuccess = () => {


  const [isLoading, setIsLoading] = useState(true);
  const [authStatus, setAuthStatus] = useState(false);
  const { id, token } = useParams();

  const userValid = async () => {

    try {
     //const response = await axios.post("http://localhost:9002/login", {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/verifyEmail/${id}/${token}`, {
      withCredentials: true, // To include credentials in the request
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data

    


    setIsLoading(false)
    if (data.status === 201) {
      //consolelog("user Valid");
      setAuthStatus(true)
      toast.success("Email Verified Successfull", {
        toastId: 'successfull'
    })

    }  else {
      //consolelog("user inValid");
      // navigate("/")
    }




    //   // }
    } catch (error) {
      if ((error.response.status === (401 ) || error.response.status === (500 )) && error.response) {
         const data = error.response.data;
         setAuthStatus(data.error)
         setAuthStatus("Reset Link Exipired")  
        
        setAuthStatus(false)
        setIsLoading(false)

        toast.error("Link Exipired Verify Again!", {
          toastId: 'Unauthrized'
      })
        // navigate("/passwordReset")
        // //consolelog(data.error)
         window.alert(data.error);
      }
      //  else {
      //   setAuthStatus(false)

      //   setAuthStatus("Something Went Worng")
      //   //consolelog(error)

      // }

      }
    // //consolelog(error);  
  }


  useEffect(() => {

    userValid();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])






  return (



    <>{isLoading ? (
      <LoadingSpinner />
    ) : !authStatus ? (

      

      <div className="flex flex-col items-center justify-center gap-16 px-6 lg:flex-row py-28 md:px-24 md:py-20 lg:py-32 lg:gap-28">
        <div className="w-full lg:w-1/2">
        <img alt='error' className="hidden lg:block" src={verifail} />
          
        </div>
        <div className="w-full lg:w-1/2">
          <h1 className="py-4 text-3xl font-extrabold text-gray-800 lg:text-4xl ">Verification Link Has Been Expired!</h1>
          <p className="py-4 text-xl text-gray-800">Please click on the below button and verify again.</p>
          <div>

            <Link to="/about" ><button
              className="w-full px-1 py-5 my-4 text-white bg-indigo-600 rounded-md lg:w-auto sm:px-16 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">Verify Again
            </button>
            </Link>
          </div>
        </div>
      </div>

    ) : (
      
      <div className="flex flex-col items-center justify-center gap-16 px-6 lg:flex-row py-28 md:px-24 md:py-20 lg:py-32 lg:gap-28">
        <div className="w-full lg:w-1/2">
          
          <img alt='error' className="hidden lg:block" src={verisuccess} />
        
        </div>
        <div className="w-full lg:w-1/2">
          <h1 className="py-4 text-3xl font-extrabold text-gray-800 lg:text-4xl ">Verification Has Been Done Successfully!</h1>
          <p className="py-4 text-xl text-gray-800">Please click on the below button to go to home page.</p>
          <div>

            <Link to="/" ><button
              className="w-full px-1 py-5 my-4 text-white bg-indigo-600 rounded-md lg:w-auto sm:px-16 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">Go back to Homepage
            </button>
            </Link>
          </div>
        </div>
      </div>
    )}
    </>

  )
}

export default VerifySuccess