import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from 'axios';
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner";

const ForgotPassword = () => {

  const navigate = useNavigate()
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authStatus, setAuthStatus] = useState("");
  const { id, token } = useParams();



  const userValid = async () => {

    try {
    // const response = await axios.post("http://localhost:9002/login", {
    // eslint-disable-next-line no-unused-vars
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/forgotPassword/${id}/${token}`, {
      // withCredentials: true, // To include credentials in the request
      headers: {
        "Content-Type": "application/json",
      },
    });






    //   // }
    } catch (error) {
      if (error.response.status === 401 && error.response) {
       
        toast.error("Link Exipired Reset Again!", {
          toastId: 'Unauthrized'
      })
        navigate("/passwordReset")
      }
     

      }
  }


  useEffect(() => {
    userValid();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])






  const sendPassword = async (e) => {
    e.preventDefault();

setIsLoading(true)

    try {
      // const response = await axios.post("http://localhost:9002/login", {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/${id}/${token}`, {
        password,cpassword
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;

      //consolelog(data);

      if (data.status === 201) {
        setIsLoading(false)

        toast.success("Password Changed Successfully!")
        navigate("/login")
        //consolelog("user Valid");
  
      }  else {
        //consolelog("user inValid");
        // navigate("/")
      }

      
    } catch (error) {
      if (error.response.status === 401 && error.response) {
        const data = error.response.data;
        setAuthStatus(data.error)
        // window.alert(data.error);
      }else if (error.response.status === 422 && error.response) {
        const data = error.response.data;
        setAuthStatus(data.error);
        // window.alert(data.error);
      } else {
        setAuthStatus("Something Went Worng")

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
              Reset <span className="text-indigo-600">Password</span>
            </h3>


            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="block text-xs font-bold leading-7 tracking-wide text-gray-700 uppercase">
                New Password
              </label>
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="cpassword"
                className="block text-xs font-bold leading-7 tracking-wide text-gray-700 uppercase">
                Confirm New Password
              </label>
              <input
                required
                value={cpassword}
                onChange={(e) => setCPassword(e.target.value)}
                type="password"
                id="cpassword"
                name="cpassword"
                placeholder="Confirm Password"
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

                  onClick={sendPassword}
                  className="px-10 py-2 text-lg font-bold text-white bg-indigo-600 border-0 rounded shadow focus:shadow-outline focus:outline-none hover:bg-indigo-800"
                >
                  Change Password
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

export default ForgotPassword