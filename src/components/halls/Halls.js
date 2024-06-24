import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
const Halls = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);


  const getHallsData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/halls`, {
        withCredentials: true, // include credentials in the request
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });

      const data = response.data;
      // console.log(data);
      setUserData(data.halls);
      setIsLoading(false);

      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
      // console.log(error);
      navigate("/login");
    }
  };



  useEffect(() => {

    getHallsData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleBookingClick = (hallId, hallName) => {
    navigate(`/bookingForm/${hallId}/${hallName}`)
  };


  return (
<>{isLoading ? (
          <LoadingSpinner />
        ) : 
    <div className="min-h-screen mt-6"> 
    
    <h1 className="ml-3 text-xl font-black leading-7 text-center text-gray-800 sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl md:leading-10">
   Available <span className="text-indigo-700"> Halls</span>  </h1>

      {Array.isArray(userData) && userData.length > 0 ? (
        userData.map((hall) => (
          <div key={hall._id} className="my-2 ">
            <div className="flex items-center justify-center w-full">
              <div className="w-full p-12 bg-white shadow-2xl rounded-xl shadow-blue-200 md:w-8/12 lg:w-8/12">

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                 
                  <div className="col-span-1 lg:col-span-9">
                    <div className="text-center lg:text-left">
                      <h2 className="text-2xl font-bold text-zinc-700">{hall.name}</h2>
                      {/* <p className="mt-2 font-semibold text-l text-zinc-700">{hall.location}</p> */}
                      {/* <p className="mt-4 text-zinc-500">I am a Front End Developer and UI/UX Designer</p> */}
                    </div>







                    <div className="grid grid-cols-2 gap-6 mt-6 text-center lg:text-left">
                      <div>
                        <p className="font-bold text-zinc-700">Location</p>
                      </div>

                      <div>
                        <p className="font-semibold text-m text-zinc-700">{hall.location}</p>
                      </div>
                    </div>



                    <div className="grid grid-cols-2 gap-6 mt-6 text-center lg:text-left">
                      <div>
                        <p className="font-bold text-zinc-700">Capacity</p>
                      </div>

                      <div>
                        <p className="font-semibold text-m text-zinc-700">{hall.capacity}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mt-6 text-center lg:text-left">
                      <div>
                        <p className="font-bold text-zinc-700">price</p>
                      </div>

                      <div>
                        <p className="font-semibold text-m text-zinc-700">{hall.price}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mt-6 text-center lg:text-left">
                      <div>
                        <p className="font-bold text-zinc-700">Description</p>
                      </div>

                      <div>
                        <p className="font-semibold text-m text-zinc-700">{hall.description}</p>
                      </div>
                    </div>










                    <div className="grid grid-cols-2 gap-4 mt-6">
                      {/* <Link to={`/bookingForm`}> */}
                      <button className="w-full px-3 py-2 font-semibold text-blue-500 bg-white border-2 border-blue-500 rounded-xl hover:bg-blue-500 hover:text-white"
                        onClick={() => handleBookingClick(hall._id, hall.name)}
                      >
                        Book Now
                      </button>
                      {/* </Link> */}
                      {/* <button className="w-full px-3 py-2 font-semibold text-blue-500 bg-white border-2 border-blue-500 rounded-xl hover:bg-blue-500 hover:text-white">
                  View Profile
                </button> */}
                    </div>


                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h2 className="mt-10 text-2xl font-bold text-center text-zinc-700">No halls found.</h2>

      )}

      </div>
}
    </>
  );
};

export default Halls;
