import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner";
import { UserContext } from "./../../App";


const Login = () => {


  const { dispatch } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(false);


  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authStatus, setAuthStatus] = useState("");




  const loginUser = async (e) => {
    e.preventDefault();

    setIsLoading(true)

    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, {
        
        email,
        password,
      }, {
        withCredentials: true, 
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
      });
      
      const data = response.data;
      
      

      localStorage.setItem("jwtoken", data.token)

      dispatch({ type: "USER", payload: true })

      if (data.userLogin.userType === 'admin') {
        dispatch({ type: 'USER_TYPE', payload: "admin" });
      } else {
        dispatch({ type: 'USER_TYPE', payload: "user" });
      }

      localStorage.setItem("userId", data.userLogin._id)
      toast.success("Login Successfull")
      setIsLoading(false);

      navigate("/");
      // }
    } catch (error) {
      if (error.response.status === 400 && error.response) {
        const data = error.response.data;
        setIsLoading(false);
        setAuthStatus(data.error)
        //window.alert(data.error);
      } else {
        setAuthStatus("Something Went Worng")
        //consolelog(error)

      }
    }
  };






  return (
    <>{isLoading ? (
      <LoadingSpinner />
    ) :
      <section className="flex items-center justify-center min-h-screen text-gray-600 bg-white body-font">
        <div className="flex flex-col p-8 mt-10 bg-white rounded-lg shadow-2xl lg:w-2/6 md:w-1/2 shadow-blue-200 md:ml-auto md:mr-auto md:mt-0">
          <form method="POST">
            



            <h3 className="my-8 text-3xl font-extrabold leading-normal tracking-tight text-gray-900 sm:text-4xl">
              Sign <span className="text-indigo-600">In</span>
            </h3>


            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="block text-xs font-bold leading-7 tracking-wide text-gray-700 uppercase"
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
                placeholder="Email"
                className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="block text-xs font-bold leading-7 tracking-wide text-gray-700 uppercase"
              >
                Password
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

            <div className="my-4">
              <p className="font-bold text-red-600 text-s">

                {authStatus}
              </p>
            </div>


            <div className="my-4">
                <Link to="/passwordReset" className="font-bold text-m hover:underline">
                    Forgot Your Password?

                  </Link>
            </div>



            <div className="mx-auto w-fit">
              <div className="mx-auto">
                <button
                  type="submit"
                  onClick={loginUser}
                  className="px-10 py-2 text-lg font-bold text-white bg-indigo-600 border-0 rounded shadow focus:shadow-outline focus:outline-none hover:bg-indigo-800"
                >
                  Login
                </button>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-m">
                Don't have an account yet?{" "}
                <Link to="/signup" className="text-blue-600 hover:underline">
                  {" "}
                  Sign Up
                </Link>
              </p>
            </div>
          </form>

        </div>
      </section>
    }
    </>
  );
};

export default Login;
