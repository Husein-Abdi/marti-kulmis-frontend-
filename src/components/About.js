import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "./LoadingSpinner";
const About = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const email = userData.email;
  const emailVerified = userData.emailVerified;
  const VerifyButton = () => {
    if (emailVerified) {
      return (
        <>
          <button className="px-5 py-2 ml-6 text-sm font-bold text-white bg-green-600 border-0 rounded shadow focus:shadow-outline focus:outline-none disable">
            Verified
          </button>
        </>
      );
    } else {
      return (
        <>
          <button
            type="submit"
            onClick={sendEmailVerificationLink}
            className="px-5 py-2 ml-6 text-sm font-bold text-white bg-indigo-600 border-0 rounded shadow focus:shadow-outline focus:outline-none hover:bg-indigo-800">
            Verify Email
          </button>
        </>
      );
    }
  };
  const sendEmailVerificationLink = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/emailVerificationLink`,
        {
          email,
        },
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      if (data) {
        setIsLoading(false);
        toast.success("Email Sent To Admin Successfull");
      }
    } catch (error) {
      if (error.response.status === 400 && error.response) {
        //consolelog(data.error)
      } else {
        //consolelog(error.response.data)
      }
    }
  };
  const callAboutPage = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/about`,
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      //consolelog(data);
      setUserData(data);
      setIsLoading(false);
      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.warn("Unauthrized Access! Please Login!", {
          toastId: "Unauthrized",
        });
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    callAboutPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex items-center justify-center w-full min-h-screen ">
          <div className="w-full p-12 bg-white shadow-2xl rounded-xl shadow-blue-200 md:w-8/12 lg:w-6/12">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="col-span-1 lg:col-span-9">
                <div className="text-center lg:text-left">
                  <h2 className="text-2xl font-bold text-zinc-700">
                    {userData.name}
                  </h2>
                  <p className="mt-2 font-semibold text-l text-zinc-700">
                    {" "}
                    {
                    userData.userType === "user"
                      ? "User"
                      : userData.userType === "user"
                      ? "User"
                      : userData.userType === "admin"
                      ? "Admin"
                      : ""}
                  </p>
                </div>

                <div className="grid items-center grid-cols-3 gap-8 mt-6 text-center lg:text-left">
                  <div>
                    <p className="font-bold text-zinc-700">Email</p>
                  </div>
                  <div>
                    <p className="font-semibold text-m text-zinc-700">
                      {userData.email}
                    </p>
                  </div>
                  <div>
                    <VerifyButton />
                  </div>
                </div>

                {userData.userType !== "admin" && (
                 <>
                 
             <div className="grid items-center grid-cols-3 gap-8 mt-6 text-center lg:text-left">
               <div>
                
               </div>
               <div>

               </div>
             </div> 
                </>
              ) 
              }

                <div className="grid items-center grid-cols-3 gap-8 mt-6 text-center lg:text-left">
                  <div>
                    <p className="font-bold text-zinc-700">Phone</p>
                  </div>
                  <div>
                    <p className="font-semibold text-m text-zinc-700">
                      {userData.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default About;
